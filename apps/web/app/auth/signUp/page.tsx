'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import InputField from '@/components/forms/InputField'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

const signUpSchema=z.object({
    email:z.string().trim().min(4,{message:"Invalid email"}).max(30,{message:"Invalid email"}),

    password:z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/, { message: "Must contain at least one special character" }),
  binanceApiKey:z.string().trim().min(4,{message:"Invalid binance api key"}).max(30,{message:"Invalid binance api key"}),
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

    const router=useRouter()

    const onSubmit:(data:SignUpFormData)=>Promise<void>=async(data:SignUpFormData)=>{
       try{
         console.log(data,'see signup data')
       }catch(error:any){
        console.log(error)
       }
    }
    
  return (
    <Card className='w-full h-full bg-black/10 pt-40'>
        <CardHeader className='px-18'>
            <CardTitle className='text-2xl'> Sign Up</CardTitle>
            <CardDescription> Sign Up to access your account</CardDescription>
        </CardHeader>
        <CardContent className=' w-full px-18'>
        <form  onSubmit={handleSubmit(onSubmit)} className='space-y-2 flex flex-col gap-y-5  '>
            <div className='space-y-2'>
                 <InputField
              name="email"
              label="Email"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
          
              disabled={isSubmitting}
               
            />
            </div>
         
         <div className='space-y-2'>
                    <InputField
              name="password"
              label="Password"
              placeholder="Enter your password"
              register={register}
              error={errors.email}
            type="password"
              disabled={isSubmitting}
               
            />
         </div>
            
          <div className='space-y-2'>
                <InputField
              name="binanceApiKey"
              label="Binance Api Key"
              placeholder="Enter your Binance Api Key"
              register={register}
              error={errors.binanceApiKey}
              type="password"
              disabled={isSubmitting}
               
            />
          </div>
            
            <div className='space-y-2'>
      <InputField
              name="binanceSecretKey"
              label="BinanceSecretKey"
              placeholder="Enter your binanceSecretKey"
              register={register}
              error={errors.binanceSecretKey}
              type="password"
              disabled={isSubmitting}
               
            />
            </div>
             
            
        

            


            <Button
             className='w-full bg-blue-400'
             type="submit"
             disabled={isSubmitting}
            >
                 {isSubmitting ? (
                    <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                 Submitting...
                 </>
                ):(
                    'Start Your Investing Journey'
                )}
            </Button>
        </form>
              <Separator className='my-5'/>

      <p className='text-sm text-muted-forground mt-4'>
        Already have an account ? {' '}
        <span className='text-sky-600 hover:underline cursor-pointer' onClick={()=>router.push('/auth/signIn')}>Sign In</span>
      </p>
        </CardContent>
    </Card>
  )
}

export default SignUp