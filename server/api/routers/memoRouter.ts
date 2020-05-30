import { Response, Router } from "express";
import { Memo } from "../../db/entity/Memo"
import { RequestWithUser } from "../../models/express"
import { createNewMemo, deleteMemo, getMemo, getUsersMemos, updateMemo, reorderMemos } from "../../controllers/memoController"

const memoRouter: Router = Router()

memoRouter.post("/", async (req: RequestWithUser, res: Response) => {

    const { title, content } = req.body;
    if (!title || !content) {
        res.sendStatus(400)
    } else {
        const newMemo: Memo = await createNewMemo(req.user, title, content)
        res.json(newMemo)
    }

})
memoRouter.post("/reorder", async (req: RequestWithUser, res: Response) => {

    const { memos,panelID } = req.body;
    // if (!title || !content) {
    //     res.sendStatus(400)
    // } else {
    //     const newMemo: Memo = await createNewMemo(req.user, title, content)
    //     res.json(newMemo)
    // }
    const reOrderedMemos = await reorderMemos(req.user,panelID,memos)
res.json(reOrderedMemos)
})

memoRouter.get("/", async (req: RequestWithUser, res: Response) => {
    const foundMemos = await getUsersMemos(req.user)
    res.send(foundMemos)
})
memoRouter.get("/:id", async (req: RequestWithUser, res: Response) => {
    res.send(await getMemo(req.params.id, req.user))
})

memoRouter.delete("/:id", async (req: RequestWithUser, res: Response) => {
    res.send(deleteMemo(req.user, req.params.id))
})
memoRouter.put("/:id", async (req: RequestWithUser, res: Response) => {
    const { title, content, panelIndex,panelID } = req.body.memo
    console.log("MEMOROUTER UPDATE")
    console.log(req.body)
    const updatedMemo = await updateMemo(req.user, req.params.id, title, content, panelIndex,panelID)
    res.send(updatedMemo)
})


export { memoRouter }