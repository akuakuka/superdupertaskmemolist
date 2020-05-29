
import { createConnection, getRepository } from "typeorm";
import { Session } from "./entity/Session"
import { TypeormStore } from 'typeorm-store';
import { POSTGRES_DATABASE, POSTGRES_IP, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USERNAME } from "../config/config";
import { User } from "./entity/User";

//import { TypeormStore, SessionEntity } from 'typeorm-store';

export const createDBConnection = async () => {
   //entities: [__dirname + "/**/."],
    try {
        const connection = await createConnection(
            {
                type: "postgres",
                host: POSTGRES_IP,
                port: parseInt(POSTGRES_PORT),
                username: POSTGRES_USERNAME,
                password: POSTGRES_PASSWORD,
                database: POSTGRES_DATABASE,
                entities: [
                    __dirname + "/**/."
                ],
                synchronize: true
            }
        );
        await connection.synchronize();
        console.log("Database Connected!")
       
    } catch (e) {
        console.log(e)
    }
}

export const getSessionStore = async () => {
    try {
        const repository = await getRepository(Session);
        return new TypeormStore({ repository })
    } catch (e) {
        console.log(e)
    }
}
