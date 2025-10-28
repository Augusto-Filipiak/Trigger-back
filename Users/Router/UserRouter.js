import { Router } from "express";
import { criarUser } from "../Controller/UserController.js";
import { verifyUserData } from "../Middleware/verify_user_data.js";

const userRouter = Router();

userRouter.post("/create", verifyUserData,(req, res) => {
    criarUser(req, res)
})


export default userRouter;