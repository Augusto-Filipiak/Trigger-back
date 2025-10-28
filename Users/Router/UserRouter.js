import { Router } from "express";
import { atualizarUser, criarUser } from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/create", (req, res) => {
    criarUser(req, res)
})

userRouter.patch("/update/:id", (req, res) => {
    atualizarUser(req, res)
})

export default userRouter;