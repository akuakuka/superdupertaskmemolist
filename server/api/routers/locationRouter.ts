import { Response, Router } from "express";
import { Memo } from "../../db/entity/Memo"
import { RequestWithUser } from "../../models/express"
import { getUsersLocations, deleteLocation } from "../../controllers/locationController";
import { Location } from "../../db/entity/Location";

const LocationRouter: Router = Router()



LocationRouter.get("/", async (req: RequestWithUser, res: Response) => {
    const foundMemos = await getUsersLocations(req.user)
    res.send(foundMemos)
})

LocationRouter.delete("/:id", async (req: RequestWithUser, res: Response) => {
    console.log("LOCATIONROUTER")
    const {id} = req.params
    const location = await Location.findOne({locationID:id})
    const foundMemos = await deleteLocation(req.user,location)
    res.send(foundMemos)
})

export { LocationRouter }