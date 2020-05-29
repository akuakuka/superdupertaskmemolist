import { Request, Response, NextFunction, Router } from "express";
import {FRONTEND_AUTH_CALLBACK} from "../../config/config";
import {passport} from "../../config/passport"

const githubRouter:Router = Router()

githubRouter.get("/",passport.authenticate('github', { scope: [ 'user:email' ] }));

githubRouter.get('/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
 async (req, res) => {
 // await wait(2000);

    res.redirect(FRONTEND_AUTH_CALLBACK);
  });

   export {githubRouter}