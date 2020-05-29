import {  Router } from "express";
import { passport } from "../../config/passport"
import { AuthenticateOptions } from "passport";
import { RequestWithUser } from "../../models/express"
import { FRONTEND_AUTH_CALLBACK } from "../../config/config";

const googleRouter: Router = Router()
const authOpts: AuthenticateOptions = {
    session: true,
    scope: ["profile", "email"],
    passReqToCallback: true
}
googleRouter.get("/googleloginfailed", (req, res) => {
    res.send("GOOGLE LOGIN FAILED REDIRECT")
})

googleRouter.get('/',passport.authenticate('google',authOpts));

googleRouter.get(
    '/callback',
    passport.authenticate('google', { session: true }),
    async (req: RequestWithUser, res) => {
       
        res.redirect(FRONTEND_AUTH_CALLBACK);
    }
);

export { googleRouter }