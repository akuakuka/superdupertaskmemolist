import User from "./User"  


export default interface ILocation {
    locationID:string
    memoID: string
    latitude: string
    longitude: string
    User: User
}