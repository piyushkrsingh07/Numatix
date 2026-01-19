import { Router } from "express";
import register from "../controllers/userAuth.js";

const app:Router = Router()

app.post('/signup',register)

export default app