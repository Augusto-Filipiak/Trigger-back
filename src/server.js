import express from "express";
import userRouter from "./Users/Router/UserRouter.js";
import patrimonioRouter from "./Patrimonios/Router/PatrimonioRouter.js";
import roteadorRelatorio from "./Relatorios/Router/RelatorioRouter.js";

const app = express()
app.use(express.json())

app.use("/patrimonio", patrimonioRouter)
app.use("/user", userRouter)
app.use("/relatorio", roteadorRelatorio)

app.listen(3000)