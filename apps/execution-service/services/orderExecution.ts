import {prisma, redisConfig} from "@repo/db"
import CryptoJS from "crypto-js";
import axios from "axios";
import { OrderSide, OrderStatus, OrderType, RedisOrderCommand } from "../types/order.js";
import type { User } from "../types/user.js";
import Cryptr from "cryptr";



const cryptr=new Cryptr(process.env.CRYPTR_SECRET as string,{encoding:'base64',pbkdf2Iterations:10000,saltLength:30})

const requestBody=(params:Record<string,string>,binanceSecretKey:string)=>{
  const queryString=new URLSearchParams(params).toString()
  const signature=CryptoJS.HmacSHA256(queryString,binanceSecretKey).toString(CryptoJS.enc.Hex)

  return `${queryString}&signature=${signature}`
}

const getBinanceTimeOffset = async () => {
  const res = await axios.get(
    "https://testnet.binance.vision/api/v3/time"
  );

  return res.data.serverTime - Date.now();
};

const RedisPubService=async(OrderStatusData: RedisOrderCommand)=>{
 const redisPub=await redisConfig.pub.publish('events:order:status',JSON.stringify({Message:OrderStatusData}))
 return redisPub
}

const placeOrder=async(binanceApiKey:string,binanceSecretKey:string,redisResponse:RedisOrderCommand)=>{
try{
 const timeOffset = await getBinanceTimeOffset();
    const params:Record<any,any>={
        symbol:redisResponse.symbol,
        side:redisResponse.side,
        type:redisResponse.type,
        quantity:redisResponse.quantity,
        timestamp:String(Date.now() + timeOffset),
          recvWindow: "5000",

    }

    console.log(redisResponse.timestamp,'time main')
    if(redisResponse.price) params.price=redisResponse.price
    if(redisResponse.stopPrice) params.stopPrice=redisResponse.stopPrice
    if(redisResponse.timeInForce) params.timeInForce = redisResponse.timeInForce
   
    const queryStringWithSignature=requestBody(params,binanceSecretKey)

    const response=await axios.post('https://testnet.binance.vision/api/v3/order',queryStringWithSignature,{
     headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'X-MBX-APIKEY':binanceApiKey
        }
    }

    )
    if(response.status === 200){
        const data=await response.data
    console.log(data,"checking out the response")
    const date=new Date(data.transactTime)
    const OrderStatusData:RedisOrderCommand={
      orderId:redisResponse.orderId,
      userId:redisResponse.userId,
      status:data?.status as OrderStatus ,
      symbol:String(data?.symbol),
      side:data?.side as OrderSide,
      type:data?.type as OrderType,
      quantity:data?.executedQty ,
      price:data?.price,
      timestamp:date.toISOString()

    }

    const dbOrderData={
           orderId:redisResponse.orderId,
      userId:redisResponse.userId,
            status:data?.status ,
    quantity:data?.executedQty ,
      price:data?.price,
      timestamp:date.toISOString()
    }

  console.log(data?.status,'dekho status jo gya hai')

    const redisPub=await RedisPubService(OrderStatusData)

    const orderEvent=await prisma.orderEvent.create({
      data:dbOrderData
    })
    console.log(orderEvent,'dekho order first')

    return orderEvent

    }
  

}catch(error){
  console.log(error,'see error')
  await redisConfig.pub.publish('events:order:status',JSON.stringify({Message:error}))

  throw error
}
   


    

}

export const OrderExecution=async(dbResponse:User,redisResponse:RedisOrderCommand)=>{
   try{
    if(!dbResponse) return
console.log(redisResponse.timestamp,'dekho timestamp')
      const {binanceApiKey,binanceSecretKey}=dbResponse

      const encryptBinanceApiKey= binanceApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const encryptBinanceSecretKey=binanceSecretKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const decyptBinanceApiKey=cryptr.decrypt(encryptBinanceApiKey)
      const decyptBinanceSecretKey=cryptr.decrypt(encryptBinanceSecretKey)

      console.log(decyptBinanceApiKey,'see decrypt key')
      console.log( decyptBinanceSecretKey,'see decrypt secret key')

      const order=await placeOrder(decyptBinanceApiKey.replace(/^"(.*)"$/, "$1"),decyptBinanceSecretKey.replace(/^"(.*)"$/, "$1"),redisResponse)

      console.log(order,'see final order')
         return order
        

   }catch(error){

      throw  error
   }
}