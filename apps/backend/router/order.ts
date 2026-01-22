import { Router } from "express";
import orderController from '../controllers/userOrder.js'
import authentication from "../middlewares/auth.js";

const app:Router=Router()

app.post('/orders',authentication,orderController.postOrder)

export default app