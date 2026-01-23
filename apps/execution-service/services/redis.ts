import {redisConfig} from "@repo/db"
import dotenv from 'dotenv'
import { RedisOrderCommand } from "../types/order"

export const RedisService=async():Promise<RedisOrderCommand>=>{


   const redisPub=await redisConfig.sub.subscribe('commands:order:submit')
    console.log(redisPub,'dekho redis pub')



  return new Promise((resolve)=>{
redisConfig.sub.on('message',async(channel:string,message:string)=>{
         if (channel !== "commands:order:submit") return;
        console.log(message,typeof message,'see message')
          resolve(JSON.parse(message).Message)
       }
    
  )  
  
    
    })
    

}