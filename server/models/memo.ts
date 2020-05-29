import {User} from "../db/entity/User"
export interface newMemo {
    title: string;
    content: string;
    UserID:User
}

