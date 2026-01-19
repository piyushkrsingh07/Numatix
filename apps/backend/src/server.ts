import dotenv from "dotenv"

import express,{Request,Response} from 'express'
import cookieparser from 'cookie-parser'
import cors from "cors"
import AuthRoutes from './router/user.js'
dotenv.config();

const app = express()
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req:Request,res:Response):Response=>{
    return res.send("Server is Live!")
})

app.use('/auth',AuthRoutes)

const port:number = Number(process.env.PORT) || 5000

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})







