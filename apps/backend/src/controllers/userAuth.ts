import { Request,Response } from "express";
import { validate } from "../validators/zodValidator.js";
import { userSchema } from "../validators/userSchema.js";
import { signupService } from "../services/userService.js";



const register=async(req:Request,res:Response)=>{
    try{
       const body= req.body
       console.log(body,"dekho body")
      const validatedBody =  await validate(userSchema,body)
      console.log(validatedBody,'validate body')
 const user=await signupService(validatedBody)
       console.log(user,'dekho user')

       return res.status(200).json({message:"User Added Successfully",data:user})

    }catch(error:any){
       res.status(400).send("Error saving the user:"+error.message)
    }
}

export default register