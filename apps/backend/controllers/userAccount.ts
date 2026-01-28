import { Request, Response } from "express"
import { BinanceTrade, NormalizedTrade, User } from "../types/user.js"
import Cryptr from "cryptr"
import axios from "axios"
import CryptoJS from "crypto-js";
import { getMarketPrice } from "../services/orderService.js";
import { redisConfig } from "@repo/db";

const requestBody=(params:Record<string,string>|string,binanceSecretKey:string)=>{
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


const accountInfo=async(req:Request,res:Response)=>{
    try{
        const timeOffset = await getBinanceTimeOffset();
        const cryptr=new Cryptr(process.env.CRYPTR_SECRET as string,{encoding:'base64',pbkdf2Iterations:10000,saltLength:30})
           const user=req.user as User
           console.log('dekho user',user)
                 const {binanceApiKey,binanceSecretKey}=user

      const encryptBinanceApiKey= binanceApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const encryptBinanceSecretKey=binanceSecretKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const decyptBinanceApiKey=cryptr.decrypt(encryptBinanceApiKey).replace(/^"(.*)"$/, "$1")
      const decyptBinanceSecretKey=cryptr.decrypt(encryptBinanceSecretKey).replace(/^"(.*)"$/, "$1")

      console.log(decyptBinanceApiKey,'see decrypt key')
      console.log( decyptBinanceSecretKey,'see decrypt secret key')

      const timestamp=String(Date.now() + timeOffset)
      const params={timestamp}
      console.log(timestamp,'dekho timestamp')
         
      const BASE_URL="https://testnet.binance.vision"
          const queryStringWithSignature=requestBody(params,decyptBinanceSecretKey)

       console.log(queryStringWithSignature,'dekho query string')
       try{
  const response=await axios.get(`${BASE_URL}/api/v3/account?${queryStringWithSignature}`,{
                   headers:{

            'X-MBX-APIKEY':decyptBinanceApiKey
        }
            })
               console.log(response,'dekho resposnse account')
       
          if(response.status === 200){
            const finalData=response.data.balances.find((b:{asset:string})=>b.asset === "USDT")

            const freeUSDTBalance=finalData.free ?? "0"
            const lockedUSDTBalance=finalData.locked ?? "0"
            const totalUSDTBalance=Number(freeUSDTBalance)+Number(lockedUSDTBalance)

            const sentData={
                freeUSDTBalance,
                lockedUSDTBalance,
                totalUSDTBalance
            }
                   return res.status(200).json({message:'User Account details fetched successfully',data:sentData})
          }
       }catch(error:any){
        console.log(error,'see error')
        throw error
       }
          
        

       

    
    }catch(error:any){
           res.status(400).send("Error in geeting user account info:"+error.message)
    }
}

const userTradesFromBinance=async(CurrentUser:User,CurrentSymbol:string)=>{
    try{
  const timeOffset = await getBinanceTimeOffset();
        const cryptr=new Cryptr(process.env.CRYPTR_SECRET as string,{encoding:'base64',pbkdf2Iterations:10000,saltLength:30})
           const user=CurrentUser
           console.log('dekho user',user)
                 const {binanceApiKey,binanceSecretKey}=user

      const encryptBinanceApiKey= binanceApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const encryptBinanceSecretKey=binanceSecretKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const decyptBinanceApiKey=cryptr.decrypt(encryptBinanceApiKey).replace(/^"(.*)"$/, "$1")
      const decyptBinanceSecretKey=cryptr.decrypt(encryptBinanceSecretKey).replace(/^"(.*)"$/, "$1")

      console.log(decyptBinanceApiKey,'see decrypt key')
      console.log( decyptBinanceSecretKey,'see decrypt secret key')

      const timestamp=String(Date.now() + timeOffset)


  const params = {
  symbol: CurrentSymbol,
  timestamp: String(Date.now() + timeOffset)
}
      console.log(timestamp,'dekho timestamp')
         
      const BASE_URL="https://testnet.binance.vision"
          const queryStringWithSignature=requestBody(params,decyptBinanceSecretKey)

       console.log(queryStringWithSignature,'dekho query string')
       try{
  const response=await axios.get(`${BASE_URL}/api/v3/myTrades?${queryStringWithSignature}`,{
                   headers:{

            'X-MBX-APIKEY':decyptBinanceApiKey
        }
            })
               console.log(response,'dekho resposnse account')
       
          if(response.status === 200){
      
               return {
                data:response.data
               }
          }
  }catch(error:any){
    console.log(error,'see error in api call')

  }
}catch(error:any){
  console.log(error.message,'see error message')
    }
}

const normalizeTrades=(tradeResponse:BinanceTrade[]):NormalizedTrade[]=>{
  return tradeResponse.map((t:BinanceTrade)=>{
    return{
        price: Number(t.price),
    qty: Number(t.qty),
    isBuyer: t.isBuyer,
    time:t.time
    }

  })

}

const calculatePosition = (trades: NormalizedTrade[]) => {
  let size = 0
  let cost = 0
  let realizedPnl = 0

  trades.sort((a, b) => a.time - b.time)

  for (const t of trades) {
    if (t.isBuyer) {

      size += t.qty
      cost += t.price * t.qty
    } else {

      if (size === 0) continue

      const sellQty = Math.min(size, t.qty)
      const avgEntry = cost / size

      realizedPnl += (t.price - avgEntry) * sellQty

      size -= sellQty
      cost -= avgEntry * sellQty

 
      if (size === 0) {
        cost = 0
        realizedPnl = 0
      }
    }
  }

  return {
    size: Number(size.toFixed(6)),
    entryPrice: size > 0 ? Number((cost / size).toFixed(2)) : 0,
    realizedPnl: Number(realizedPnl.toFixed(6)),
  }
}




const userTrades=async(req:Request,res:Response)=>{
  try{
     const user=req.user as User
     const symbol='BTCUSDT'

     const tradeResponse=await userTradesFromBinance(user,symbol)
     console.log(tradeResponse,'see trading response')
     
     const trades:NormalizedTrade[]=  normalizeTrades(tradeResponse?.data)

     console.log(trades,'see response from normalized trades')

     const position=calculatePosition(trades)

     const marketPrice=await getMarketPrice(symbol)

         const unrealizedPnl =
      position.size > 0
        ? Number((marketPrice - position.entryPrice) * position.size).toFixed(6)
        : 0

        const finalData={
      symbol,
      size: position.size,
      entryPrice: position.entryPrice,
      marketPrice,
      realizedPnl: position.realizedPnl,
      unrealizedPnl
    }
 const redis=redisConfig.redis.set(
  `positions:${symbol}`,
  JSON.stringify(finalData)
)
   
      return res.status(200).json({message:`Successfully trades order`,data:finalData})

  }catch(error:any){
 res.status(400).send("Error in getting position"+error.message)
  }
}

const all_exports={
    accountInfo,
userTrades
}

export default all_exports