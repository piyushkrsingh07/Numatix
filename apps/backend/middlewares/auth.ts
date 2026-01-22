import { NextFunction, Request, Response } from "express";
import { customErrorResponse } from "../utils/responseObject.js";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from "@repo/db";
dotenv.config();




const authentication=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const token=req.headers['x-access-token']
       console.log(token,"dekho token")
       if(!token || Array.isArray(token)){
        console.log("error m aa gye")
        return res.status(StatusCodes.FORBIDDEN).json({message:customErrorResponse(
            {
               explanation:'Invalid data sent from the client',
               message:'No auth token provided'
            },
        )},
    )
       }
       const response=await jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload

       console.log(response,"see jwt")

       const {id}=response
         console.log(id,"dekho id")
       const userData=await prisma.user.findUnique({
         where:{
            id:id
        }
       })
         console.log(userData,'see user')
       if(!userData){
                return res.status(StatusCodes.FORBIDDEN).json({message:customErrorResponse(
            {
               explanation:'Invalid data sent from the client',
               message:'Enter valid credentials'
            },
        )},
    )
       }

       req.user={
        id:userData?.id,
        email:userData?.email,
        binanceApiKey:userData?.binanceApiKey,
        binanceSecretKey:userData?.binanceSecretKey
       }
       console.log(req.user,'dekho request')
       next()
    }catch(error){
      console.log("JWT ERROR:", error);
  return res.status(StatusCodes.UNAUTHORIZED).json({
    message: customErrorResponse({
      explanation: "Invalid token",
      message: "Token is invalid or expired",
    }),
  });

    }
}

export default authentication