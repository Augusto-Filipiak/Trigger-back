import { Router } from "express";
import { criarRelatorio, excluirRelatorio, editarRelatorio, pegarTodosRelatorios } from "../Controller/RelatorioController";

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

roteadorRelatorio.get("/", (req, res) => {
    pegarTodosRelatorios(req, res)
})

export default roteadorRelatorio