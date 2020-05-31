
import { createConnection, getRepository } from "typeorm";
import { Session } from "./entity/Session"
import { TypeormStore } from 'typeorm-store';
import { POSTGRES_DATABASE, POSTGRES_IP, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME, DATABASE_URL } from "../config/config";
import { User } from "./entity/User";

//import { TypeormStore, SessionEntity } from 'typeorm-store';

export const createDBConnection = async () => {
    console.log("Creating db connection!")
    let devpgurl
    if(process.env.NODE_ENV === "develop") {
        console.log("if")
        devpgurl = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_IP}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`
    } else {
        console.log("else")
        devpgurl = DATABASE_URL
    }
    console.log(devpgurl)
   // url: 'postgres://test:test@localhost/test'
    try {
        const connection = await createConnection(
            {
                
                type: "postgres",
                url:devpgurl,
                entities: [
                    __dirname + "/**/."
                ],
                synchronize: true
            }
        );
        await connection.synchronize();
        console.log("Database Connected!")
        return connection
       
    } catch (e) {
        console.log(e)
    }
}

export const getSessionStore = () => {
    try {
        const repository = getRepository(Session);
        return new TypeormStore({ repository })
    } catch (e) {
        console.log(e)
    }
}
