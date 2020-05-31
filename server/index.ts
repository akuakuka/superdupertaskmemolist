

import { createDBConnection } from './db/dbsetup';
import { PORT, SESSION_SECRET, FRONTEND_CORSURL } from './config/config';
import * as express from 'express';
import * as session from "express-session"
import { urlencoded, json } from "body-parser";
import * as cors from "cors"
import { bot } from "./services/telegramService";
import passport = require("passport");
import { debugLogger } from "./middleware/degublogger";
import { googleRouter } from "./api/routers/googleRouter";
import { localRouter } from "./api/routers/localRouter";
import { spotifyRouter } from "./api/routers/spotifyRouter";
import { githubRouter } from "./api/routers/githubRouter";
import { ensureAuthenticated } from "./config/passport";
import { LocationRouter } from "./api/routers/locationRouter";
import { panelRouter } from "./api/routers/panelRouter";
import { memoRouter } from "./api/routers/memoRouter";
import { userRouter } from "./api/routers/userRouter";
import { TypeormStore, SessionEntity } from "typeorm-store";
import {  Repository } from "typeorm";
import { Session } from "./db/entity/Session";
import "reflect-metadata";
console.log("indexin sisäl")
//import session = require("express-session");
console.log(`PORTTI : ${PORT}`)
createDBConnection().then((connection) => {
  console.log("indexin sisäl")
  const sessionRepo = connection.getRepository(Session)
  const app = express();
  console.log(bot)
  app.use(cors({
    credentials: true,
    origin: FRONTEND_CORSURL
  }))
  
  app.use(session({
      secret: SESSION_SECRET,
      cookie: {
        path:"/",
        maxAge: 1000 * 60 * 60 * 24 * 31 // 1 month
      },
      store: new TypeormStore({repository: sessionRepo as unknown as Repository<SessionEntity>}),
      resave: true,
      saveUninitialized: true
    }));
  
  
  app.use(urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session())
  app.use(json()); 
  
  app.use("/auth/google", debugLogger,googleRouter);
  app.use("/auth/local", debugLogger,localRouter);
  app.use("/auth/github", debugLogger,githubRouter);
  app.use("/auth/spotify", debugLogger,spotifyRouter);
  app.use("/location",debugLogger,ensureAuthenticated,LocationRouter)
  app.use("/memo",debugLogger,ensureAuthenticated,memoRouter);
  app.use("/panel",debugLogger,ensureAuthenticated,panelRouter);
  app.use("/user",debugLogger,ensureAuthenticated,userRouter);
  
  app.get("/", (req, res) => {
    res.send("ok")
  })

   app.listen(parseInt(PORT), () => {

    console.log(`"Server running on port ${PORT}"`);
  });
}).catch((err) => {
   console.log("Failed to start!")
   console.log(err)
});

