import * as passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { GOOGLE_CALLBACKURL, GOOGLE_CLIENTID, GOOGLE_SECRET } from "../config/config"
import { User } from "../db/entity/User"
import { Social } from "../db/entity/Social"
import { getRepository } from "typeorm";
import { SPOYIFY_CALLBACKURL, GITHUB_CLIENT_ID, GITHUB_CALLBACKURL, GITHUB_CLIENT_SECRET, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID, JWT_SECRET } from "../config/config"
import { Strategy as GHStrat } from "passport-github"
import axios from 'axios';
import { Strategy as SpotifyStrategy } from "passport-spotify";
import { Panel } from "../db/entity/Panel";
import { Strategy as LocalStrategy} from "passport-local"

const createDefaultPanels = async (user: User) => {
  try {
    const found = await User.findOne({ userID: user.userID });
    await Panel.create({
      title: "todo",
      userID: found,
      memos: [],
      default: true
    }).save();
    await Panel.create({
      title: "in progress",
      userID: found,
      memos: [],
      default: false
    }).save();
    await Panel.create({
      title: "completed",
      userID: found,
      memos: [],
      default: false
    }).save();
  }
  catch (e) {
    console.log(e)
  }
}

const getGithubEmail = async (accessToken: string) => {
  const url = 'https://api.github.com/user/emails'
  // const token = `token ${accessToken}`
  const headers = {
    authorization: `token ${accessToken}`,
  }
  const { data } = await axios.get(url, { headers })
  const em = await data.filter(email => email.primary === true)[0].email;
  return em;
}

const createNewSocialUser = async (email, socialID, service) => {
  const found = await User.findOne({ email: email })
  console.log("found")
  if (found) {
    await Social.create({ socialProfileID: socialID, userID: found, socialType: service }).save();
    return found;
  } else {
    const newSocialUser = await User.create({ email: email, username: email }).save();
    await Social.create({ socialProfileID: socialID, userID: newSocialUser, socialType: service }).save();
    await createDefaultPanels(newSocialUser)
    return newSocialUser;
  }
}

export const ensureAuthenticated = async (req, res, next) => {
  if(process.env.NODE_ENV==="develop") {
    return next();
  }
  if (req.isAuthenticated()) {
    console.log("IS AUTHENTICATED!")
    return next();
  }
  console.log("NOT AUTHENTICATED!")
  res.redirect("/");
};

passport.serializeUser(async (user: User, done) => {
  console.log("Serializeuser sisäl")
  console.log(user)
  done(null, user)
});
passport.deserializeUser(async (user: User, done) => {
  console.log("DESERIALIZE SISÄL")
  const found = await User.findOne({ userID: user.userID })
  if (found) {
    console.log("found")
    done(null, found);
  } else {
    done('Error when deserializing User', null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: GOOGLE_CALLBACKURL,
      clientID: GOOGLE_CLIENTID,
      clientSecret: GOOGLE_SECRET,
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {

      const user: User = await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.socials", "social")
        .where("social.socialProfileID = :socialProfileID", { socialProfileID: profile.id })
        .andWhere("social.socialType = :socialType", { socialType: "google" })
        .getOne();
      if (user) {
        done(null, user)
      } else {
        done(null, await createNewSocialUser(profile.emails[0].value, profile.id, "google"))
      }

    }
  )
);

passport.use(new GHStrat({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: GITHUB_CALLBACKURL
},
  async (accessToken, refreshToken, profile, done) => {
    let email = '';
    if (!profile.emails[0].value) {
      email = await getGithubEmail(accessToken);

    } else {
      email = profile.emails[0].value
    }

    const user: User = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.socials", "social")
      .where("social.socialProfileID = :socialProfileID", { socialProfileID: profile.id })
      .andWhere("social.socialType = :socialType", { socialType: "github" })
      .getOne();
    if (user) {
      done(null, user);
    } else {

      done(null, await createNewSocialUser(email, profile.id, "github"))
    }
  }
));


passport.use(
  new SpotifyStrategy(
    {
      clientID: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      callbackURL: SPOYIFY_CALLBACKURL
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const user: User = await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.socials", "social")
        .where("social.socialProfileID = :socialProfileID", { socialProfileID: profile.id })
        .andWhere("social.socialType = :socialType", { socialType: "spotify" })
        .getOne();
      if (user) {
        done(null, user);
      } else {
        done(null, await createNewSocialUser(profile._json.email, profile.id, "spotify"))
      }
    }
  )
);

 passport.use(new LocalStrategy(
   async (username, password, done) => {
     console.log("LocalStrat")
     if (password === null) {
      return done(null, false)
     } 
      const user = await User.findOne({ username: username })
     console.log(user)
    if (!user) { return done(null, false); }
    console.log(user.checkPassword(password))
    if (!user.checkPassword(password)) { return done(null, false); }
    return done(null, user);
  }
 ));



export { passport };