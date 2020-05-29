import { Router } from "express";
import {FRONTEND_AUTH_CALLBACK} from "../../config/config";
import {passport} from "../../config/passport"

const spotifyRouter:Router = Router()

spotifyRouter.get("/",passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private']
  }));

spotifyRouter.get('/callback', 
  passport.authenticate('spotify', { failureRedirect: '/login' }),
 async (req, res) => {
    // Successful authentication, redirect home.
    console.log("callback")
    res.redirect(FRONTEND_AUTH_CALLBACK);
  });

   export {spotifyRouter}