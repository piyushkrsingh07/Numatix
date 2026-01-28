'use client'
import { useSymbol } from "@/hooks/useSymbol"
import axiosConfig from "./axiosConfig"


export const fetchUserAccount=async(token:string)=>{
    try{
     const response=await axiosConfig.get(`/user/account/info`,{
        headers:{
            'x-access-token':token
        }
     })

console.log('see workspace details by id',response)
return response.data
    }catch(error:any){
  console.log('Error in get account info',error)
        throw error.response.data
    }
}

export const getSymbolPosition=async(token:string,currentSymbol:string)=>{
    try{
  const symbol = currentSymbol ?? 'BTCUSDT';
      const response=await axiosConfig.get(`/user/account/myTrades`,{
                headers:{
            'x-access-token':token
        },
        params:{
            symbol:symbol
        }
      })

      return response.data
    }catch(error:any){
  console.log('Error in getting symbol position',error)
    }
}

export const getUserOrder=async(token:string)=>{
    try{
 

      const response=await axiosConfig.get(`/api/trading/orders/`,{
                headers:{
            'x-access-token':token
        },
      })

      return response.data
    }catch(error:any){
  console.log('Error in getting symbol position',error)
    }
}