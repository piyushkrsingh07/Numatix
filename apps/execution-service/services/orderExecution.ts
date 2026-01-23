
import type { User } from "../types/user.js";
import Cryptr from "cryptr";

const cryptr=new Cryptr(process.env.CRYPTR_SECRET as string,{encoding:'base64',pbkdf2Iterations:10000,saltLength:30})

export const OrderExecution=(dbResponse:User)=>{
   try{
    if(!dbResponse) return

      const {binanceApiKey,binanceSecretKey}=dbResponse

      const encryptBinanceApiKey= binanceApiKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const encryptBinanceSecretKey=binanceSecretKey.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const decyptBinanceApiKey=cryptr.decrypt(encryptBinanceApiKey)
      const decyptBinanceSecretKey=cryptr.decrypt(encryptBinanceSecretKey)

      console.log(decyptBinanceApiKey,'see decrypt key')
      console.log( decyptBinanceSecretKey,'see decrypt secret key')



   }catch(error){
      throw  error
   }
}