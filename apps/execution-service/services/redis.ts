import {redisConfig} from "@repo/db"
import dotenv from 'dotenv'
import { RedisOrderCommand } from "../types/order"
import { dbResponse } from "./dbService"
import { User } from "../types/user"
import { OrderExecution } from "./orderExecution"

export const RedisService=async()=>{


   const redisPub=await redisConfig.sub.subscribe('commands:order:submit')
    console.log(redisPub,'dekho redis pub')



redisConfig.sub.on('message',async(channel:string,message:string)=>{
         if (channel !== "commands:order:submit") return;
        console.log(message,typeof message,'see message')
        const redisResponse:RedisOrderCommand=JSON.parse(message).Message
              const db:User|null=await dbResponse(redisResponse )
       if(!db ) return
      console.log(db,'see db repsonse')
      
      const executeOrder=await OrderExecution(db,redisResponse)
       console.log(executeOrder,'see execute order')
       }
    
  )  
  
    
    }
    

