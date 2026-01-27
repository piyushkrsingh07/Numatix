'use client'
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { signInRequest } from "@/app/config/authConfig";
import { placeSymbolOrder } from "@/app/config/orderConfig";
import { placeOrder } from "@/types/charts";

interface PlaceOrderRequest {
      data: placeOrder
  token: string
}

export const usePlaceOrder=()=>{
    const {auth,setAuth}=useAuth()
// console.log(auth?.token,'see token bhjna s phle')
        const {isPending,isSuccess,error,mutateAsync:placeOrderMutation} = useMutation({         //on calling the mutate function the use mutation is going to trigger
        mutationFn:(data:placeOrder)=>placeSymbolOrder({data,token:auth.token as string}),
        onSuccess:(data)=>{
      console.log(data)
      },

        
        onError:(error:any)=>[
            console.error('Failed to sign up',error)
        ]
    })

    return {
        isPending,
        isSuccess,
        error,
  placeOrderMutation,
       
    }
}