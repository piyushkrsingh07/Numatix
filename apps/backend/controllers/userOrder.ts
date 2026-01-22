import { Request,Response } from "express";
import { validate } from "../validators/zodValidator.js";

import { OrderService } from "../services/orderService.js";
import { OrderSchema } from "../validators/orderSchema.js";
import type { User } from "../types/user.js";
import { RedisService } from "../services/redisService.js";



const postOrder=async(req:Request,res:Response)=>{
    try{

        const body=req.body
        console.log(body,'req body')

        const validateBody=await validate(OrderSchema,body)
        const user=req.user as User
        console.log(user,"see user in controller")
        const order=await OrderService(validateBody,user)

               console.log(order,"dekho order")

         
        const redisPubllish=await RedisService(order)

        console.log(redisPubllish,'dekho publish finally')


       return res.status(200).json({message:`Order in ${order.status}`,data:{order:order.orderId,status:order.status}})

       
    }catch(error:any){
       res.status(400).send("Error in publishing order"+error.message)
    }
}

const all_exports={
    postOrder
}

export default all_exports