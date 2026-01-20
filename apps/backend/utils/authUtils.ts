import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

interface payload {
    id:Number
    email:String,
    password:string
}
export const createJwt=async(payload:payload)=>{
  return jwt.sign(payload,process.env.JWT_SECRET as string,{
    expiresIn:"5h"
  })
}