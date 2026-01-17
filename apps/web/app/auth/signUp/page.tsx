'use client'
import { Card } from '@/components/ui/card'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const signUpSchema=z.object({
    email:z.string().trim().min(4,{message:"Invalid email"}).max(30,{message:"Invalid email"}),

    password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: "Must contain at least one special character" }),
  binanceApiKey:z.string().trim().min(4,{message:"Invalid secret key"}).max(30,{message:"Invalid binance api key"}),
  binanceSecretKey:z.string().trim().min(4,{message:"Invalid secret Key"}).max(30,{message:"Invalid binance secret key"})

})

const SignUp = () => {

    const {
        register,
        handleSubmit,
        control,
        formState:{errors,isSubmitting}
    } = useForm<SignUpFormData>({
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            email:"",
            password:"",
            binanceApiKey:"",
            binanceSecretKey:""
        }
    })

    const onSubmit:(data:SignUpFormData)=>Promise<void>=async(data:SignUpFormData)=>{
       try{
         console.log(data,'see signup data')
       }catch(error:any){
        console.log(error)
       }
    }
    
  return (
    <Card className='w-full h-full'>
       
    </Card>
  )
}

export default SignUp