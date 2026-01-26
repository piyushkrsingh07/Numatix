import { Request,Response } from "express";
import { validate } from "../validators/zodValidator.js";
import { userSignInSchema, userSignUpSchema } from "../validators/userSchema.js";
import { signInService, signupService } from "../services/userService.js";



const register=async(req:Request,res:Response)=>{
    try{
       const body= req.body
       console.log(body,"dekho body")
      const validatedBody =  await validate(userSignUpSchema,body)
      console.log(validatedBody,'validate body')
 const user=await signupService(validatedBody)
       console.log(user,'dekho user')
        const {token}=user
        console.log(token,'dekho token')

        res.cookie("token",token,{
         expires:new Date(Date.now()+2*3600000)
        })
         res.cookie("user",user,{
         expires:new Date(Date.now()+2*3600000)
        })
       return res.status(200).json({message:"User Added Successfully",data:user})

    }catch(error:any){
       res.status(400).send("Error saving the user:"+error.message)
    }
}

const login=async(req:Request,res:Response)=>{
   try{
     const body=req.body
        console.log(body,'see body')
     const validatedBody=await validate(userSignInSchema,body)
       console.log(validatedBody,'see validated body')
     const user = await signInService(validatedBody)
     const {token}=user
             res.cookie("token",token,{
         expires:new Date(Date.now()+2*3600000)
        })

        res.cookie("user",JSON.stringify(user),{
         expires:new Date(Date.now()+2*3600000)
        })

         return res.status(200).json({message:"User LoggedIn Successfully",user})

   }catch(error:any){
 res.status(400).send("Error logging the user:"+error)
   }
}

const all_exports={
   register,
   login
}

export default all_exports