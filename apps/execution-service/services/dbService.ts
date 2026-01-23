import { prisma } from "@repo/db"
import type {  User } from "../types/user"
import type {OrderSide, OrderStatus, OrderType} from '../types/order'



export const dbResponse=async(redisResponse:Record<string,string|number>): Promise<User | null>=>{
   try{
       const {userId,orderId,symbol,side,type,quantity,status}=redisResponse

       

       const orderCommand=await prisma.orderCommand.create({
          data:{
            userId:Number(userId),
            orderId:String(orderId),
            symbol:String(symbol),
            side:String(side) as OrderSide,
            type:String(type) as OrderType,
            quantity:String(quantity),
            status:status as OrderStatus
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