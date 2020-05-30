
import { User } from "../db/entity/User"
import { Memo } from "../db/entity/Memo"
import { Panel } from "../db/entity/Panel"

export const getUsersPanels = async (User: User) => {
    const foundPanels = await Panel.find({userID:User})

    return foundPanels;
}

export const getPanel = async (memoID,user:User) => {
//return await Panel.find({memoID:memoID,userID:user})
}

export const createNewPanel = async (user: User, title) => {

const panelUser:User = await User.findOne({userID: user.userID});
const panel = new Panel();
panel.title = title
panel.userID = panelUser
await panel.save();
return panel;
}

export const deletePanel = async (User: User,panelID) => {
    console.log("delete panel controller")
  await Panel.delete({userID:User,panelID:panelID});
  return Panel.find({userID:User});
}

export const updatePanel = async (User:User,panelID,title) => {
    console.log("UPATRE PANEL")
    const newPanel = await Panel.findOne({userID:User,panelID:panelID})
    newPanel.title = title;
    await newPanel.save();
    
    return newPanel
}