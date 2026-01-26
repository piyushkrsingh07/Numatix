'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InputField from '@/components/forms/InputField'
import { useTheme } from '@/hooks/useTheme'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const OrderSchema = z.object({
  quantity: z.string().min(1, 'Quantity is required'),
  limit_price: z.string().optional().or(z.literal('')),
  trigger_price: z.string().optional().or(z.literal('')),
})

type ParentValue='BUY'|'SELL'
type ChildValue='LIMIT'|'MARKET'|'STOPMARKET'

interface OrderFormProps {
    parentValue:ParentValue;
    childValue:ChildValue

}

type OrderFormData = z.infer<typeof OrderSchema>

const OrderForm = ({parentValue,childValue}:OrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      limit_price: '',
      quantity: '',
      trigger_price: '',
    },
  })

  const onSubmit = async (data: OrderFormData) => {
    console.log(data,'dekho data jo gya hai')
  }

  const { isDark } = useTheme()

  return (
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* LIMIT PRICE */}
          {(parentValue === 'BUY' || parentValue === 'SELL') && childValue === 'LIMIT' && (
  <div className="space-y-1">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <InputField
                name="limit_price"
                type="number"
                label="Limit price"
                placeholder="0.00"
                register={register}
                error={errors.limit_price}
                disabled={isSubmitting}
                suffix="USDT"
              />
            </div>
          </div>
          ) }
                    {(parentValue === 'BUY' || parentValue === 'SELL') && childValue === 'STOPMARKET' && (
                <div className="space-y-1 opacity-70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <InputField
                name="trigger_price"
                type="number"
                label="Trigger price "
                placeholder="0.00"
                register={register}
                error={errors.trigger_price}
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
                disabled
                
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
