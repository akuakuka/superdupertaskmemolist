
import { TELEGRAM_KEY } from "../config/config"
import { User } from "../db/entity/User"
import { Plugin } from "../db/entity/Plugin"
import { Location } from "../db/entity/Location"
import * as TelegramBot from 'node-telegram-bot-api';
import { VerifyPlugin } from "../db/entity/VerifyPlugin";
import { createNewMemo } from "../controllers/memoController";
import { createNewLocation } from "../controllers/locationController";
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

bot.on('location', async (msg) => {

  const chatId = msg.chat.id;
  const {latitude,longitude} = msg.location
  try {
    const user = await getUserFromChatID(chatId);
    console.log(user)
    if (user) {
      const city = await getCity(latitude,longitude)
      const newLocationMemo = await createNewMemo(user,city,"Location")
      
      await createNewLocation(user,latitude,longitude,newLocationMemo)
     
      bot.sendMessage(chatId, `New Location saved. City: ${city}`)
    }
  } catch (e) {
    console.log(e)
    bot.sendMessage(chatId, JSON.stringify(e))
  }
});
