import User from "./User"  
import IMemo from "./Memo";


export default interface IPicture {

    pictureID: string;
    pictureURL: string;
    user: User;
    memo: IMemo;
    memoID: string;
    userID: string;
}