import {  Response,  Router } from "express";
import { User } from "../../db/entity/User"
import { RequestWithUser } from "../../models/express"
import { createVerifyCode } from "../../controllers/verifyController";

const userRouter: Router = Router()

userRouter.get("/", async (req: RequestWithUser, res: Response) => {
    try {
        const user = await User.findOne({userID:req.user.userID})
        res.json(user)
    } catch(e) {
        console.log(e)
    }
});

userRouter.get("/verify/:type", async (req: RequestWithUser, res: Response) => {

    const {type} = req.params
    const user = await User.findOne({userID:req.user.userID});
    const code = await createVerifyCode(user,type)
    res.json(code)
})

export { userRouter }