import { Router } from "express";
import { criarRelatorio, excluirRelatorio, editarRelatorio } from "../Controller/RelatorioController";

const roteadorRelatorio = Router()

roteadorRelatorio.post("/", (req, res) => {
    criarRelatorio(req, res)
})

roteadorRelatorio.delete("/:id", (req, res) => {
    excluirRelatorio(req, res)
})

roteadorRelatorio.patch("/update/:id", (req, res) => {
    editarRelatorio(req, res)
})

export default roteadorRelatorio