import { verifyUser } from "../../Users/Middleware/verify_user_base64.js";
import {
    criarPatrimonio,
    deletarPatrimonio,
    pegarTodosPatrimonios,
    pegarUmPatrimonio, 
    atualizarUmPatrimonio 
} from "../Controller/PatrimonioController.js";

import { Router } from "express";

const patrimonioRouter = Router();

patrimonioRouter.post("/",[verifyUser], (req, res) => {
    criarPatrimonio(req, res)
})

patrimonioRouter.delete("/:id",[verifyUser], (req, res) => {
    deletarPatrimonio(req,res)
})

patrimonioRouter.get("/", (req, res) => {
    pegarTodosPatrimonios(req, res)
})

patrimonioRouter.get("/:id", (req, res) => {
    pegarUmPatrimonio(req, res)
})

patrimonioRouter.patch("/update/:id",[verifyUser], (req, res) => {
    atualizarUmPatrimonio(req, res) 
})

export default patrimonioRouter