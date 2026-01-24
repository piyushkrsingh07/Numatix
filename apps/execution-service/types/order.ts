export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL"
}

export enum OrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT"
}

export enum OrderStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  EXECUTED = "EXECUTED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  FILLED="FILLED",
  REJECTED="REJECTED",
  PARTIALLY_FILLED="PARTIALLY_FILLED"

}

export interface RedisOrderCommand {
  orderId: string;
  userId: number;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  quantity: string;
  stopPrice?:string;
  timeInForce?:string;
  price?: string;
  status?: OrderStatus;
  timestamp: string;
}
