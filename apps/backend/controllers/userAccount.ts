import { Request, Response } from "express"
import { User } from "../types/user.js"
import Cryptr from "cryptr"
import axios from "axios"
import CryptoJS from "crypto-js";

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

const all_exports={
    accountInfo,

}

export default all_exports