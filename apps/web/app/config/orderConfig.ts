import { placeOrder } from "@/types/charts";
import axios from "@/app/config/axiosConfig"

interface PlaceOrderRequest {
      data: placeOrder
  token: string
}


export const placeSymbolOrder=async({data,token}:PlaceOrderRequest)=>{
     console.log(token,'checking final token')
    try{
       const response=await axios.post(`/api/trading/orders`,data
        ,{
        headers:{
            'x-access-token':token
        }
       })

       console.log(response,'see response of palce order')

       
    }catch(error:any){
            console.log('Error in de',error)
        throw error
    }
}