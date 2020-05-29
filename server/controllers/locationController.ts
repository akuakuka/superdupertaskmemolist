
import { User } from "../db/entity/User"
import { Memo } from "../db/entity/Memo"
import { Location } from "../db/entity/Location";


export const getUsersLocations = async (User: User) => {
    return await Location.find({ userID: User.userID });
}

export const getLocation = async (locationID, user: User) => {
    return await Location.find({  userID: user.userID,locationID:locationID })
}

export const createNewLocation = async (user: User, lat:number, long:number,memo:Memo) => {

    const locationUser = await User.findOne({userID:user.userID});
    const slat = `${lat}`
    const slong = `${long}`

    return await Location.create({
        userID: locationUser.userID,
        user: locationUser,
        longitude: slong,
        latitude: slat,
        memo:memo
      }).save();
}

export const deleteLocation = async (User: User, locationID) => {
    try {
        const locationToDelete = await Location.findOne({locationID:locationID})
        await Memo.delete({memoID:locationToDelete.memoID})
        await Location.delete({ locationID: locationID });
    } catch(e) {
        console.log(e)
    }
}

export const updateLocation = async (User: User, memoID, lat, long) => {
    const updatedLocation = await Location.findOne({ user:User,latitude:lat,longitude:long })
    updatedLocation.latitude = lat;
    updatedLocation.longitude = long;
    await updatedLocation.save();
    return updatedLocation
}