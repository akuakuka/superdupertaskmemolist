import User from "./User"  
import IPanel from "./Panel";
import Location from "./Location";
import IPicture from "./Picture"

export default interface IMemo {
    memoID: string
    title: string
    content: string
    locationID?: string;
    Location: Location;
    pictureID?: string;
    pictureURL?: string;
    Picture: IPicture;
    User: User
    panelID:string;
    panelIndex:number;
    createdDate: Date
}