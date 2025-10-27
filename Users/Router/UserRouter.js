import { Router } from "express";
import { criarUser } from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/create", (req, res) => {
    criarUser(req, res)
})


export default userRouter;