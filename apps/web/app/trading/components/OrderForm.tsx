'use client'

import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import { useTheme } from '@/hooks/useTheme'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { usePrice } from '@/hooks/usePrice'
import { useSymbol } from '@/hooks/useSymbol'

const OrderSchema = z.object({
  quantity: z.string().min(1,'Quantity is required'),
  price: z.string().optional().or(z.literal('')),
  stopPrice: z.string().optional().or(z.literal('')),
})

type ParentValue='BUY'|'SELL'
type ChildValue='LIMIT'|'MARKET'|'STOP_MARKET'

interface OrderFormProps {
    parentValue:ParentValue;
    childValue:ChildValue

}

type OrderFormData = z.infer<typeof OrderSchema>

const OrderForm = ({parentValue,childValue}:OrderFormProps) => {
  const {currentSymbol}=useSymbol()
    const { isDark } = useTheme()
  const {closeprice}=usePrice()

  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      price: '',
      quantity: '',
      stopPrice:''
    },
  })

  const currentPrice=useWatch({
    control,
    name:'price'
  })

    const currentQuantity=useWatch({
    control,
    name:'quantity'
  })
  
  const onSubmit = async (data: OrderFormData) => {
    console.log(data,'dekho data jo gya hai')
    const finalData={...data,
      type:childValue,
      side:parentValue,
      symbol:currentSymbol
    }
    console.log(finalData,'dekho final data')
  }



  useEffect(()=>{
   if(closeprice === 0) return
   setValue("price",closeprice.toString(),{
    shouldDirty:false,
    shouldValidate:true
   })
  },[closeprice,setValue])

  return (
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
   
          {(parentValue === 'BUY' || parentValue === 'SELL') && childValue === 'LIMIT' && (
  <div className="space-y-1">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <InputField
                name="price"
                type="number"
                label="Limit price"
                placeholder="0.00"
                register={register}
                error={errors.price}
                disabled={isSubmitting}
                step="0.01"
                suffix="USDT"
              />
            </div>
          </div>
          ) }
                    {(parentValue === 'BUY' || parentValue === 'SELL') && childValue === 'STOP_MARKET' && (
                <div className="space-y-1 opacity-70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <InputField
                name="stopPrice"
                type="number"
                label="Trigger price "
                placeholder="0.00"
                register={register}
                error={errors.stopPrice}
                disabled={isSubmitting}
                suffix="USDT"
               
              />
            </div>
          </div>
                  ) }

      
          <div className="grid grid-cols-2 gap-3 items-start">
         
            <div className="col-span-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <InputField
                name="quantity"
                type="number"
                label="Quantity"
                placeholder="0.00"
                register={register}
                error={errors.quantity}
                disabled={isSubmitting}
                suffix="BTC"
              />
            </div>
     <div className="col-span-1 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
       <Label htmlFor="total">Total</Label>
       <div className="relative flex items-center">

       
              <Input
                name="total"
                type="number"
                readOnly
                placeholder="0.00"
                  className="cursor-not-allowed opacity-70 mt-1"
    
                value={childValue === 'LIMIT'?Number(currentPrice || 0 )*Number(currentQuantity || 0):Number(currentPrice || 0) *Number(currentQuantity || 0) }
              />
                  <div
                    className={cn(
                      'absolute right-2 flex items-center px-2 text-xs font-medium',
                      isDark
                        ? 'text-gray-400 bg-red-500'
                        : 'text-gray-500 bg-white'
                    )}
                  >
                    USDT
                  </div>
              </div>
            </div>
          
          </div>


       
  

        
          <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-4 w-4 rounded border border-white/30" />
              30.16 USD
            </div>

            <button
              type="button"
              className="rounded-full bg-purple-500/20 px-4 py-1.5 text-xs font-medium text-purple-400"
            >
              Add funds
            </button>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full rounded-full py-6
              bg-gradient-to-r from-gray-800 to-gray-900
              text-sm font-semibold text-white
              hover:opacity-90
            "
          >
            Buy BTC
          </Button>
        </form>
  
  )
}

export default OrderForm
