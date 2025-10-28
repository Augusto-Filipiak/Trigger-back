import { criarPatrimonio, deletarPatrimonio, pegarTodosPatrimonios, pegarUmPatrimonio } from "../Controller/PatrimonioController.js";
import { Router } from "express";

const patrimonioRouter = Router();

patrimonioRouter.post("/", (req, res) => {
    criarPatrimonio(req, res)
})

patrimonioRouter.delete("/:id", (req, res) => {
    deletarPatrimonio(req,res)
})

patrimonioRouter.get("/", (req, res) => {
    pegarTodosPatrimonios(req, res)
})

patrimonioRouter.post("/:id", (req, res) => {
    pegarUmPatrimonio(req, res)
})

export default patrimonioRouter