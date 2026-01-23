import { prisma } from "@repo/db"
import type { User } from "../types/user"



export const dbResponse=async(redisResponse:Record<string,string|number>): Promise<User | null>=>{
   try{
       const {userId}=redisResponse

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