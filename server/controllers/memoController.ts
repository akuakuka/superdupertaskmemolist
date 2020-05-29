
import { User } from "../db/entity/User"
import { Memo } from "../db/entity/Memo"
import { Panel } from "../db/entity/Panel"
import { getRepository } from "typeorm"

export const getUsersMemos = async (User: User) => {
    return await Memo.find({ userID: User });
}

export const getMemo = async (memoID, user: User) => {
    return await Memo.find({ memoID: memoID, userID: user })
}

export const createNewMemo = async (user: User, title, content) => {
    //const memoUser:User = await User.findOne({userID: user.userID});
    //const memoUser = await User.findOne({ relations: ["panels"] });
    //const defaultPanel:Panel = await Panel.findOne({default:true});
    
    const memoUser = await User.findOne({ relations: ["panels"],where: {
        userID:user.userID
    } });
    const defaultPanel = memoUser.panels.filter(p => p.default === true)[0]
    const memo = new Memo();
    memo.userID = memoUser;
    memo.title = title;
    memo.content = content;
    memo.panelID = defaultPanel.panelID;
    await memo.save();
    return memo;

}

export const deleteMemo = async (User: User, memoID) => {
    return await Memo.delete({ userID: User, memoID: memoID });
}

export const updateMemo = async (User: User, memoID, title, content) => {
    const newMemo = await Memo.findOne({ userID: User, memoID: memoID })
    newMemo.title = title;
    newMemo.content = content;
    await newMemo.save();
    return newMemo
}