import { prisma } from "@repo/db"



export const dbResponse=async(redisResponse:Record<string,string|number>)=>{
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