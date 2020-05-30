
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
    const defaultPanelMemos = await Memo.find({panelID:defaultPanel.panelID})
    const memo = new Memo();
    memo.userID = memoUser;
    memo.title = title;
    memo.content = content;
    memo.panelID = defaultPanel.panelID;
    memo.panelIndex = defaultPanelMemos.length + 1
    await memo.save();
    return memo;

}

// export const changeMemoIndex = async (User: User, memoID,newIndex:number) => {
//     const memoToChange = await Memo.findOne({ userID: User, memoID: memoID })
//     memoToChange.panelIndex = newIndex
//     return await memoToChange.save();
// }

export const reorderMemos = async (User: User,panelID:string,memos:Memo[]) => {
    console.log(memos)

   const mm = memos.map(async m => {

        const found = await Memo.findOne({memoID:m.memoID})
        if(found) {
            found.panelIndex = m.panelIndex
            return await found.save()
        } else {
            console.log("NOT FOUND")
        }

    })
    const resolved = await Promise.all(mm)
    console.log(resolved)
return resolved;
}

export const deleteMemo = async (User: User, memoID) => {
    return await Memo.delete({ userID: User, memoID: memoID });
}

export const updateMemo = async (User: User, memoID, title, content, panelIndex,panelID) => {
   
    const newMemo = await Memo.findOne({ userID: User, memoID: memoID })
    // if(panelID===newMemo.panelID && panelIndex !== newMemo.panelIndex) {
    //         await reorderMemos(User,memoID,panelIndex,panelID)
    // }
    newMemo.panelIndex = panelIndex
    newMemo.title = title;
    newMemo.content = content;
    newMemo.panelID = panelID
    console.log("Controler")
    console.log(newMemo)
    await newMemo.save();
    return newMemo
}