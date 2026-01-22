import { Request,Response } from "express";

const postOrder=async(req:Request,res:Response)=>{
    try{
       return res.status(200).json({message:"Api Hit Successfully"})
    }catch(error:any){
       res.status(400).send("Error saving the user:"+error.message)
    }
}

const all_exports={
    postOrder
}

export default all_exports