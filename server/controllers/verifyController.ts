
import { User } from "../db/entity/User"
import { VerifyPlugin } from "../db/entity/VerifyPlugin";

export const createVerifyCode = async (user: User, type: string) => {

    const plugin = await VerifyPlugin.create({
        userID: user.userID,
        type: type
    }).save();
    return plugin;
}

