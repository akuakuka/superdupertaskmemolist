import {Request} from "express";
import {User} from "../db/entity/User"
export interface RequestWithUser extends Request {
    user?: User;
}

