import express from "express";
import userRouter from "./Users/Router/UserRouter.js";
import patrimonioRouter from "./Patrimonios/Router/Router.js";

const app = express()
app.use(express.json())

app.use("/patrimonio", patrimonioRouter)
app.use("/user", userRouter)

app.listen(3000)