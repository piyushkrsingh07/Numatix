import {Router} from 'express'
import authentication from "../middlewares/auth.js";
import accountController from '../controllers/userAccount.js'
const app:Router=Router()

app.get('/info',authentication,accountController.accountInfo)

export default app