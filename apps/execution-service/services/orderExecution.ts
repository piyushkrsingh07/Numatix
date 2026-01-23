
import CryptoJS from "crypto-js";
import axios from "axios";
import { RedisOrderCommand } from "../types/order.js";
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


const placeOrder=async(binanceApiKey:string,binanceSecretKey:string,redisResponse:RedisOrderCommand)=>{

    const timeOffset = await getBinanceTimeOffset();
    const params:Record<any,any>={
        symbol:redisResponse.symbol,
        side:redisResponse.side,
        type:redisResponse.type,
        quantity:redisResponse.quantity,
        timestamp:String(Date.now() + timeOffset),
          recvWindow: "5000",

    }

    console.log(redisResponse.timeStamp,'time main')
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
    }



    

}

export const OrderExecution=async(dbResponse:User,redisResponse:RedisOrderCommand)=>{
   try{
    if(!dbResponse) return
console.log(redisResponse.timeStamp,'dekho timestamp')
      const {binanceApiKey,binanceSecretKey}=dbResponse

      const encryptBinanceApiKey= binanceApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const encryptBinanceSecretKey=binanceSecretKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const decyptBinanceApiKey=cryptr.decrypt(encryptBinanceApiKey)
      const decyptBinanceSecretKey=cryptr.decrypt(encryptBinanceSecretKey)

      console.log(decyptBinanceApiKey,'see decrypt key')
      console.log( decyptBinanceSecretKey,'see decrypt secret key')

      const order=await placeOrder(decyptBinanceApiKey.replace(/^"(.*)"$/, "$1"),decyptBinanceSecretKey.replace(/^"(.*)"$/, "$1"),redisResponse)
         


   }catch(error){
      throw  error
   }
}