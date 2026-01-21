import { NextFunction, Request, Response } from "express";
import { customErrorResponse } from "../utils/responseObject.js";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from "@repo/db";
dotenv.config();

interface User {
  email:string;
  passsword?:string;
  binanceApiKey:string;
  binanceSecretKey:string
}

interface Requests extends Request{
   user:User
}

const authentication=async(req:Requests,res:Response,next:NextFunction)=>{
    try{
       const token=req.headers['x-access-token']
       if(!token || Array.isArray(token)){
        return res.status(StatusCodes.FORBIDDEN).json({message:customErrorResponse(
            {
               explanation:'Invalid data sent from the client',
               message:'No auth token provided'
            },
        )},
    )
       }
       const response=await jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload

       const {id}=response

       const userData=await prisma.user.findUnique({
         where:{
            id:id
        }
       })

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
        email:userData?.email,
        binanceApiKey:userData?.binanceApiKey,
        binanceSecretKey:userData?.binanceSecretKey
       }
       next()
    }catch(error){

    }
}

export default authentication