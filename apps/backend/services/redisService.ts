import {redisConfig} from "@repo/db"

interface Order {
  orderId:string;
  status:string;
  redisCommand:Record<string,any>
}

export const RedisService=async(order:Order)=>{
   const redisPub=await redisConfig.pub.publish('commands:order:submit',JSON.stringify(order))
    console.log(redisPub,'dekho redis pub')
   return redisPub
}