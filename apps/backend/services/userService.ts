import { prisma } from "@repo/db";
import { SignupData } from "../validators/userSchema.js";

export const signupService =async(data:SignupData)=>{
   try {

    console.log("yha aa gye")
    console.log(data,'dekho data')
    const {email,password,binanceApiKey,binanceSecretKey}=data
      const newUser=await prisma.user.create({
        data:{
          email,
          password,
          binanceApiKey,
          binanceSecretKey
        }
      })
      console.log(newUser,"dekho new user")
      return newUser
   }catch(error){
     throw error
   }
}