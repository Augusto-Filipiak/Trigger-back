import { Router } from "express";
import { verifyUserData } from "../Middleware/verify_user_data.js";
import { atualizarUser, criarUser, adquirirPatrimonio} from "../Controller/UserController.js";

const userRouter = Router();

userRouter.post("/", verifyUserData,(req, res) => {
    criarUser(req, res)
})

userRouter.patch("/update/:id", (req, res) => {
    atualizarUser(req, res)
})

userRouter.post("/adquirirPatrimonio/:user_id/:patrimonio_id", (req, res) => {
    adquirirPatrimonio(req, res)
})

export default userRouter;