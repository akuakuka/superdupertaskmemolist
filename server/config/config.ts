import * as dotenv from "dotenv";
dotenv.config();

export const { DATABASE_URL,FRONTEND_CORSURL,POSTGRES_DATABASE,POSTGRES_PASSWORD,POSTGRES_USERNAME,POSTGRES_PORT,POSTGRES_IP,TEST_USERNAME, GOOGLE_GEOCODEAPIKEY,FRONTEND_AUTH_CALLBACK,SESSION_SECRET,TEST_PASSWORD, SPOYIFY_CALLBACKURL, SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID, GOOGLE_CLIENTID, GOOGLE_SECRET, GOOGLE_CALLBACKURL, JWT_SECRET, MONGODBURL, TELEGRAM_KEY, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACKURL } = process.env