export interface User {
    id:number;
  email:string;
  passsword?:string;
  binanceApiKey:string;
  binanceSecretKey:string
}

export interface BinanceTrade {
  symbol: string
  id: number
  orderId: number
  orderListId: number
  price: string
  qty: string
  quoteQty: string
  commission: string
  commissionAsset: string
  time: number
  isBuyer: boolean
  isMaker: boolean
  isBestMatch: boolean
}

export interface NormalizedTrade {
  price: number
  qty: number
  isBuyer: boolean
  time: number
}

