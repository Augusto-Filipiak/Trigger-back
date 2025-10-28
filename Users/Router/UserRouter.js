import { Router } from "express";
import { criarUser } from "../Controller/UserController.js";
import { verifyUserData } from "../Middleware/verify_user_data.js";
import { atualizarUser, criarUser } from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/create", verifyUserData,(req, res) => {
    criarUser(req, res)
})

userRouter.patch("/update/:id", (req, res) => {
    atualizarUser(req, res)
})

export default userRouter;