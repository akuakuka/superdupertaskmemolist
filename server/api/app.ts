
import * as express from 'express';
import * as session from "express-session"
import { urlencoded, json } from "body-parser";
import { memoRouter } from "./routers/memoRouter"
import { passport, ensureAuthenticated } from "../config/passport"

import { githubRouter } from "./routers/githubRouter";
import { spotifyRouter } from "./routers/spotifyRouter"
import { googleRouter } from "./routers/googleRouter";
import { userRouter } from './routers/userRouter';
import { panelRouter } from './routers/panelRouter';
import { localRouter } from './routers/localRouter';
import * as cors from "cors"
//import { TypeormStore, SessionEntity } from 'typeorm-store';
import {TypeormStore} from 'connect-typeorm'
import { SESSION_SECRET, FRONTEND_CORSURL, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_PORT } from '../config/config';
import {bot} from "../services/telegramService"
import { getSessionStore } from '../db/dbsetup';
import { debugLogger } from '../middleware/degublogger';
import { LocationRouter } from './routers/locationRouter';
import {PGStore} from "connect-pg-simple"
import Pool from "pg-pool"


// var pgPool = new Pool({
//   database: 'postgres',
//   user: POSTGRES_USERNAME,
//   password: POSTGRES_PASSWORD,
//   port: POSTGRES_PORT,
//   idleTimeoutMillis: 1000, // close idle clients after 1 second
//   connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
//   maxUses: 7500,
// });
// const app = express();
// console.log(bot)
// app.use(cors({
//   credentials: true,
//   origin: FRONTEND_CORSURL
// }))

// app.use(session({
//     secret: SESSION_SECRET,
//     cookie: {
//       path:"/",
//       maxAge: 1000 * 60 * 60 * 24 * 31 // 1 month
//     },
//     store: new PGStore({
//       pool : pgPool,                // Connection pool
//       tableName : 'Sassion'   // Use another table-name than the default "session" one
//     }),
//     resave: true,
//     saveUninitialized: true
//   }));


// app.use(urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session())
// app.use(json()); 

// app.use("/auth/google", debugLogger,googleRouter);
// app.use("/auth/local", debugLogger,localRouter);
// app.use("/auth/github", debugLogger,githubRouter);
// app.use("/auth/spotify", debugLogger,spotifyRouter);
// app.use("/location",debugLogger,ensureAuthenticated,LocationRouter)
// app.use("/memo",debugLogger,ensureAuthenticated,memoRouter);
// app.use("/panel",debugLogger,ensureAuthenticated,panelRouter);
// app.use("/user",debugLogger,ensureAuthenticated,userRouter);

// app.get("/", (req, res) => {
//   res.send("ok")
// })


// export { app }