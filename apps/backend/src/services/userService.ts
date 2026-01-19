import { prisma } from "@repo/db";
import { SignupData } from "../validators/userSchema.js";

export const signupService =async(data:SignupData)=>{
   try {
    const {email,password,binanceApiKey,binanceSecretKey}=data
      const newUser=await prisma.user.create({
        data:{
          email,
          password,
          binanceApiKey,
          binanceSecretKey
        }
      })
      return newUser
   }catch(error){
     throw error
   }
}