import { Router } from "express";
import authController from "../controllers/userAuth.js";

const app:Router = Router()

app.post('/register',authController.register)
app.post('/login',authController.login)

export default app