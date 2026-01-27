import dotenv from "dotenv"

import express,{Request,Response} from 'express'
import cookieparser from 'cookie-parser'
import cors from "cors"
import AuthRoutes from './router/user.js'
import OrderRoutes from './router/order.js'
import AccountRoutes from "./router/account.js"
dotenv.config();

const app = express()
app.use(cors({
        origin: "http://localhost:3000",
    credentials: true, 
}))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req:Request,res:Response):Response=>{
    return res.send("Server is Live!")
})

app.use('/auth',AuthRoutes)
app.use('/api/trading',OrderRoutes)
app.use('/user/account',AccountRoutes)

const port:number = Number(process.env.PORT) || 5000

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})







