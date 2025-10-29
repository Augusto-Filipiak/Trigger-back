import { Router } from "express";
import { criarRelatorio, excluirRelatorio, editarRelatorio, pegarTodosRelatorios } from "../Controller/RelatorioController.js";
import { validacaoRelatorios } from "../Middleware/verify_relatorios_data.js";
import { verifyUser } from "../../Users/Middleware/verify_user_base64.js";


const roteadorRelatorio = Router()

roteadorRelatorio.post("/",[validacaoRelatorios], (req, res) => {
    criarRelatorio(req, res)
})

roteadorRelatorio.delete("/:id",[verifyUser], (req, res) => {
    excluirRelatorio(req, res)
})

roteadorRelatorio.patch("/update/:id", (req, res) => {
    editarRelatorio(req, res)
})

roteadorRelatorio.get("/", (req, res) => {
    pegarTodosRelatorios(req, res)
})

export default roteadorRelatorio