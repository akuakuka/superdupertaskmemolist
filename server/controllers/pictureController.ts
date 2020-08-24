
import { User } from "../db/entity/User"
import { Memo } from "../db/entity/Memo"

import { Picture } from "../db/entity/Picture";


export const getUsersPictures = async (User: User) => {
    return await Picture.find({ userID: User.userID });
}

export const getPicture = async (pictureID, user: User) => {
    return await Picture.find({  userID: user.userID,pictureID:pictureID })
}

export const createNewPicture = async (user: User,memo:Memo,picutreURL:string) => {

    const pictureUser = await User.findOne({userID:user.userID});

    return await Picture.create({
        userID: pictureUser.userID,
        user: pictureUser,
        memo:memo,
        pictureURL:picutreURL
      }).save();
}

export const deleteLocation = async (User: User, pictureID) => {
    try {
        const locationDelete = await Picture.findOne({pictureID:pictureID})
        await Memo.delete({memoID:locationDelete.memoID})
        await Picture.delete({ pictureID: pictureID });
    } catch(e) {
        console.log(e)
    }
}
