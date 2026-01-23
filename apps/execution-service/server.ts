import dotenv from "dotenv"
import {redisConfig} from "@repo/db"

import express,{Request,Response} from 'express'
import cookieparser from 'cookie-parser'
import cors from "cors"
import { RedisService } from "./services/redis.js";
import { dbResponse } from "./services/dbService.js"
import { OrderExecution } from "./services/orderExecution.js"
import  type { User } from "./types/user.js"
import { RedisOrderCommand } from "./types/order.js"

dotenv.config();

const app = express()
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req:Request,res:Response):Response=>{
    return res.send("event Execution is Live!")
})

async function start(){
    try{
     await  RedisService() // this service subscribe to redis commands

    }catch(error){
      console.log(error)
    }
}


const port:number = Number(process.env.PORT) || 4005

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})

start().catch((e)=>{
    console.log("execution service crashed")
})
