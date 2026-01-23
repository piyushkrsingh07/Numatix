import z from "zod";

const validSite=["BUY","SELL"]
const validType=['LIMIT' , 'MARKET' , 'STOP_LOSS' , 'STOP_LOSS_LIMIT' ,'TAKE_PROFIT' , 'TAKE_PROFIT_LIMIT']
const validTimeInForce=['GTC' , 'IOC' , 'FOK']

export const OrderSchema=z.object({
 symbol:z.string().trim().min(2,{message:"Invalid symbol"}).max(15,{message:"Invalid symbol"}),
side:z.enum(validSite),
type:z.enum(validType),
 quantity:z.string().trim().min(1,{message:"Invalid quantity"}).max(15,{message:"Invalid quantity"}),
 price:z.string().min(1,{message:"Invalid price"}).max(15,{message:"Invalid price"}).optional(),
 stopPrice:z.string().min(1,{message:"Invalid stop price"}).max(15,{message:"Invalid stop price"}).optional(),
 timeInForce:z.enum(validTimeInForce).optional()
})

export type OrderData = z.infer<typeof OrderSchema>