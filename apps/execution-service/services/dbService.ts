import { prisma } from "@repo/db"
import type {  User } from "../types/user"
import type { RedisOrderCommand} from '../types/order'



export const dbResponse=async(redisResponse:RedisOrderCommand): Promise<User | null>=>{
   try{
       const {userId,orderId,symbol,side,type,quantity,status}=redisResponse
         console.log(orderId,'dekho order id')
       

       const orderCommand=await prisma.orderCommand.create({
          data:{
            userId,
            orderId,
            symbol,
            side,
            type,
            quantity,
            status
          }
            
          
       })
console.log(orderCommand,'see order Commanf')
       const user=await prisma.user.findUnique({
        where:{
            id:Number(userId)
        }
       }) // This user is already authenticated in bakend middleware

         
       return user
   }catch(error){
  throw error
   }
}