import {  Router } from "express";
import { User } from "../../db/entity/User"
import { passport } from "../../config/passport"

const localRouter: Router = Router()


localRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req,res,next) => {
console.log("LOCAL ROUTER!")
        if (!req.body.username || !req.body.password) {
            res.status(406).send('Missing password or username');
        } else {
            try {
                const user = await User.findOneOrFail({ username: req.body.username });
                if (await user.checkPassword(req.body.password)) {
                    res.send("OK")
                } else {
                    console.log("invalid login")
                    next('Invalid login');
                }
            } catch (err) {
                next(err);
            }

}});

localRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username })
  //  console.log(foundUser)
    if (username.length < 3) {
        res.status(401).send({ error: "Username too short" });
    } else if (password.length < 4) {
        res.status(401).send({ error: "Password too short" });
    } else if (foundUser) {
        res.status(401).send({ error: "Username taken" });
    } else {
        const newUser = await new User();
        newUser.password = newUser.hashPassword(password);
        newUser.username = username
        newUser.email = username
        await newUser.save();
        res.send("OK,registered!")
    }
});


export { localRouter }