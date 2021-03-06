
import { TELEGRAM_KEY } from "../config/config"
import { User } from "../db/entity/User"
import { Plugin } from "../db/entity/Plugin"
import { Location } from "../db/entity/Location"
import * as TelegramBot from 'node-telegram-bot-api';
import { VerifyPlugin } from "../db/entity/VerifyPlugin";
import { createNewMemo } from "../controllers/memoController";
import { createNewLocation } from "../controllers/locationController";
import { createNewPicture } from "../controllers/pictureController";
import {getCity} from "../services/geoService"

export const bot = new TelegramBot(TELEGRAM_KEY, { polling: true });


const getUserFromChatID = async (chatid): Promise<User> => {

  try {
    const plugin: Plugin = await Plugin.findOne({chatID:chatid})
    const user: User = await User.findOne({userID:plugin.userID})
    return user;
  } catch (e) {
    console.log("CANT FIND USER!")
    return undefined
  }
}

const getLargestImage = (images:TelegramBot.PhotoSize[]) => {
  const compare = (a, b)  => {
    const aTotalSize = a.height * a.width;
    const bTotalSize = b.height * b.width;
    if (aTotalSize > bTotalSize) return -1;
    if (bTotalSize > aTotalSize) return 1;
  
    return 0;
  }
  return images.sort(compare)[0]
}

bot.onText(/\/verify/, async (msg) => {
  const [start, verifyCode] = msg.text.toString().split(" ");
  const chatId = msg.chat.id;
  console.log(verifyCode)
  bot.sendMessage(chatId, "verifying!")
  const verify = await VerifyPlugin.findOne({code:verifyCode,type:"telegram"});
  if(verify) {
    try {
      const foundUser = await User.findOne({ userID: verify.userID });
      const plugin = new Plugin();
      plugin.chatID = chatId.toString();
      plugin.type = "telegram";
      plugin.user = foundUser;
      plugin.userID = foundUser.userID
      await plugin.save();
      bot.sendMessage(chatId, "verify ok!")
    } catch(e) {
      console.log(e)
      bot.sendMessage(chatId, "ERROR")
    }
  
  } else {
    bot.sendMessage(chatId, "invalid code")
  }
  console.log(verify)
});


bot.onText(/\/start/, async (msg) => {
  const [start, userID] = msg.text.toString().split(" ");
  const chatId = msg.chat.id;
  console.log(start)
  try {
    const foundUser = await User.findOne({ userID: userID });
    const plugin = new Plugin();
    plugin.chatID = chatId.toString();
    plugin.type = "telegram";
    plugin.user = foundUser;
    plugin.save();
  } catch (e) {
    bot.sendMessage(chatId, e.toString())
  }
});

bot.onText(/\/memo/, async (msg) => {
  const [start, memo] = msg.text.toString().split(" ");
  const chatId = msg.chat.id;
  console.log(chatId)
  bot.sendMessage(chatId,"adding memo!")
  try {
    const user = await getUserFromChatID(chatId);
    console.log(user)
    if (user) {
      await createNewMemo(user,"TelegramMemo!",memo)
      bot.sendMessage(chatId,"New memo added!")
    } else {
      bot.sendMessage(chatId,"Error finding user!")
    }
  } catch (e) {
    bot.sendMessage(chatId, JSON.stringify(e))
  }
});
bot.on('photo', async (msg) => {
console.log("GOT PHOTO!")
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `GOT PHOTO!`)
  //console.log(msg)

  try {
    const filelink = await bot.getFileLink(getLargestImage(msg.photo).file_id)
    console.log(msg.photo)
    console.log(filelink)
    const user = await getUserFromChatID(chatId);
    const newPictureMemo = await createNewMemo(user,"picture","content");
    const picture = await createNewPicture(user,newPictureMemo,filelink);
    newPictureMemo.Picture = picture
    await newPictureMemo.save()
    bot.sendMessage(chatId, `Picture saved with id: ${picture.pictureID}`)
  } catch(e) {
    bot.sendMessage(chatId, `Error when saving picture!!: ${e}`)
  }
 

  // try {
  //   const user = await getUserFromChatID(chatId);
  //   console.log(user)
  //   if (user) {
  //     const city = await getCity(latitude,longitude)
  //     const newLocationMemo = await createNewMemo(user,city,"Location")
      
  //     await createNewLocation(user,latitude,longitude,newLocationMemo)
     
  //     bot.sendMessage(chatId, `New Location saved. City: ${city}`)
  //   }
  // } catch (e) {
  //   console.log(e)
  //   bot.sendMessage(chatId, JSON.stringify(e))
  // }
});

bot.on('location', async (msg) => {

  const chatId = msg.chat.id;
  const {latitude,longitude} = msg.location
  try {
    const user = await getUserFromChatID(chatId);
    console.log(user)
    if (user) {
      const city = await getCity(latitude,longitude)
      const newLocationMemo = await createNewMemo(user,city,"Location")
      
      const newLocation = await createNewLocation(user,latitude,longitude,newLocationMemo)
      newLocationMemo.Location = newLocation
      await newLocationMemo.save()
      bot.sendMessage(chatId, `New Location saved. City: ${city}`)

    }
  } catch (e) {
    console.log(e)
    bot.sendMessage(chatId, JSON.stringify(e))
  }
});
