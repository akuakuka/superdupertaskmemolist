import {  Response, Router } from "express";
import { RequestWithUser } from "../../models/express"
import { createNewPanel,getPanel,updatePanel,deletePanel,getUsersPanels } from "../../controllers/panelController"
import { Panel } from "../../db/entity/Panel";

const panelRouter: Router = Router()

panelRouter.post("/", async (req: RequestWithUser, res: Response) => {
    const { title } = req.body;
    if (!title) {
        res.sendStatus(400)
    } else {
        const newPanel: Panel = await createNewPanel(req.user, title)
        res.json(newPanel)
    }
})
panelRouter.get("/", async (req: RequestWithUser, res: Response) => {
    const foudnPanels: Panel[] = await getUsersPanels(req.user)
    console.log(foudnPanels)
    res.send(foudnPanels)
})
panelRouter.get("/:id", async (req: RequestWithUser, res: Response) => {
    res.send(await getPanel(req.params.id, req.user))
})

panelRouter.delete("/:id", async (req: RequestWithUser, res: Response) => {
    res.send(await deletePanel(req.user, req.params.id))
})
panelRouter.put("/:id", async (req: RequestWithUser, res: Response) => {
    const { title } = req.body
    res.send(await updatePanel(req.user, req.params.id, title))
})


export { panelRouter }