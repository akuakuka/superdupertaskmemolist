import User from "./User"  
import IPanel from "./Panel";

export default interface IMemo {
    memoID: string
    title: string
    content: string
    User: User
    panelID:string;
    panelIndex:number;
    createdDate: Date
}