import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/user.js";
import { OrderData } from "../validators/orderSchema.js";
import { timeStamp } from "console";
import { prisma } from "@repo/db";

export const OrderService=(data:OrderData,user:User)=>{
  try{

    const {symbol,side,type,quantity, timeInForce,price,stopPrice}=data
      const {id}=user
 const orderId =uuidv4().substring(0,6)
 const redisCommand={
    orderId,
    userId:id,
    symbol,
    side,
    type,
    quantity,
    price,
    status:"PENDING",
    timeInForce,
    stopPrice,
    timestamp:new Date().toISOString()
 }

 return {
    orderId,
    status:'PENDING',
    redisCommand
 }

  }catch(error){
     throw error
  }
}

export const getUserOrder=async(user:User)=>{
   try{
      const {id}=user
      const getOrder=await prisma.orderEvent.findMany({
         where:{
            userId:id
         }
      })

      console.log('see order of the user',getOrder)
      return getOrder
   }catch(error){
      throw error
   }
}