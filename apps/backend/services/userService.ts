import { prisma } from "@repo/db";
import { SignInData, SignupData } from "../validators/userSchema.js";
import bcrypt from 'bcrypt'
import { createJwt } from "../utils/authUtils.js";
import { email } from "zod";
import ClientError from "../errors/clientErrors.js";
import { StatusCodes } from "http-status-codes";

export const signupService =async(data:SignupData)=>{
   try {

    console.log("yha aa gye")
    console.log(data,'dekho data')
    const {email,password,binanceApiKey,binanceSecretKey}=data
     
        
    const salt=await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password,salt)
        const hashedApiKey = await bcrypt.hashSync(binanceApiKey,salt)
        const hashedSecretkey = await bcrypt.hashSync(binanceSecretKey,salt)

      const newUser=await prisma.user.create({
        data:{
          email,
          password:hashedPassword,
          binanceApiKey:hashedApiKey,
          binanceSecretKey:hashedSecretkey
        }
      })
      console.log(newUser,"dekho new user")
   
      return {
        email:newUser.email,
        token: await createJwt({id:newUser.id,email:newUser.email,password:newUser.password})
      }
   }catch(error){
     throw error
   }
}

export const signInService=async(data:SignInData)=>{
   try{
      const user=await prisma.user.findUnique({
        where:{
          email:data.email
        }
      })
      console.log(user,'see user')
      if(!user){
               throw new ClientError ({
        explanation:'Invalid data sent from the client',
        message:'No registered user found for this email',
        statusCode:StatusCodes.NOT_FOUND
       })
      }

      const isMatch=await bcrypt.compareSync(data.password,user.password)
      console.log(isMatch,'see matching')
      if(!isMatch){
        throw new ClientError({
                      explanation:'Invalid data sent from the client',
            message:'Invalid password please try again',
            statusCode:StatusCodes.BAD_REQUEST
        })
      }

      return {
     
          id:user.id,
          email:user.email,
         
       
        token:await createJwt({id:user.id,email:user.email,password:user.password})
      }
   }catch(error){
    throw error
   }
}