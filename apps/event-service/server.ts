import dotenv from "dotenv"
import {redisConfig} from "@repo/db"
import http from 'http'

import express,{Request,Response} from 'express'
import cookieparser from 'cookie-parser'
import cors from "cors"

import { emitOrderToSocket, initializeSocket } from "./services/socket"


dotenv.config();

const app = express()
app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieparser())

app.get('/',(req:Request,res:Response):Response=>{
    return res.send("event Execution is Live!")
})

const port:number =  Number(process.env.PORT) || 1000


const server=http.createServer(app)

    initializeSocket(server)
async function start(){ 
    try{
 const redisSub=await redisConfig.sub.subscribe('events:order:status')
 console.log(redisSub,'dekho redis sub')

 redisConfig.sub.on('message',async(channel:string,message:string)=>{
    if(channel !== "events:order:status") return
    console.log(JSON.parse(message).Message,'dekho message finally')
      const data:Record<string,any>=JSON.parse(message).Message
    emitOrderToSocket(data.userId,{
        type:"ORDER_UPDATE",
        data:{
            orderId:data.userId,
            status:data.status,
            symbol:data.symbol,
            price:data.price
        }
    })


 })

    }catch(error){
      console.log(error)
      
    }
}

server.listen(port,()=>{
    console.log(`server hello is running at http://localhost:${port}`)
})

start().catch((e)=>{
    console.log("execution service crashed")
})
