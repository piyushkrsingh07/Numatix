import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import OrderForm from './OrderForm'

const OrderSection = () => {
  return (
    <div className="flex-col  sm:flex sm:flex-row h-full w-full  gap-6 lg:flex-col">
      {/* Portfolio Card */}
     <div className="w-full sm:w-1/2 lg:w-full rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
  {/* Title */}
  <h2 className="mb-4 text-lg font-semibold text-gray-900">
    Portfolio
  </h2>

  {/* BUY / SELL Tabs */}
  <Tabs defaultValue="BUY">
    <TabsList className="mb-1 rounded-full border border-gray-200 bg-gray-50 p-1">
      <TabsTrigger
        value="BUY"
        className="
          rounded-full px-6 py-2 text-sm font-semibold
          text-gray-400
          data-[state=active]:bg-white
          data-[state=active]:text-gray-900
          data-[state=active]:shadow-sm
        "
      >
        BUY
      </TabsTrigger>

      <TabsTrigger
        value="SELL"
        className="
          rounded-full px-6 py-2 text-sm font-semibold
          text-gray-400
          data-[state=active]:bg-white
          data-[state=active]:text-gray-900
          data-[state=active]:shadow-sm
        "
      >
        SELL
      </TabsTrigger>
    </TabsList>

    {/* BUY CONTENT */}
    <TabsContent value="BUY" className="mt-4">
      <Tabs defaultValue="LIMIT">
        {/* LIMIT / MARKET / STOP */}
        <TabsList   className="
    mb-4
    inline-flex
    w-full
    rounded-full
    border border-gray-200
    bg-gray-50
    p-1
    gap-2

  
  "
>
<TabsTrigger
  value="LIMIT"
  className="
    rounded-full px-2.5 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
>
  LIMIT
</TabsTrigger>



          <TabsTrigger
            value="MARKET"
          className="
    rounded-full px-2 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
          >
            MARKET
          </TabsTrigger>

          <TabsTrigger
            value="STOPMARKET"
     className="
    rounded-full px-2 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
          >
           STOP MARKET
          </TabsTrigger>
        </TabsList>

        {/* LIMIT FORM */}
        <TabsContent value="LIMIT">
       
           <OrderForm parentValue="BUY" childValue="LIMIT"/>
         
        </TabsContent>
        <TabsContent value='MARKET'>
           <OrderForm parentValue="BUY" childValue="MARKET"/>
        </TabsContent>
        <TabsContent value='STOPMARKET'>
       <OrderForm parentValue="BUY" childValue="STOPMARKET"/>
        </TabsContent>
        
      </Tabs>
    </TabsContent>


    <TabsContent value="SELL" className="mt-4">
     <Tabs defaultValue="LIMIT">
      
        <TabsList   className="
    mb-4
    inline-flex
    w-auto
    rounded-full
    border border-gray-200
    bg-gray-50
    p-1
    gap-2
  "
>
<TabsTrigger
  value="LIMIT"
  className="
    rounded-full px-6 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
>
  LIMIT
</TabsTrigger>



          <TabsTrigger
            value="MARKET"
          className="
    rounded-full px-6 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
          >
            MARKET
          </TabsTrigger>

          <TabsTrigger
            value="STOPMARKET"
     className="
    rounded-full px-6 py-2 text-sm font-semibold
    text-gray-400
    bg-transparent

    data-[state=active]:bg-white
    data-[state=active]:text-gray-900
    data-[state=active]:shadow-sm

    hover:bg-transparent
    focus:bg-transparent
  "
          >
           STOP MARKET
          </TabsTrigger>
        </TabsList>

        {/* LIMIT FORM */}
        <TabsContent value="LIMIT">
       
           <OrderForm parentValue="BUY" childValue="LIMIT"/>
         
        </TabsContent>
        <TabsContent value='MARKET'>
           <OrderForm parentValue="BUY" childValue="MARKET"/>
        </TabsContent>
        <TabsContent value='STOPMARKET'>
           <OrderForm parentValue="BUY" childValue="STOPMARKET"/>
        </TabsContent>
        
      </Tabs>
    </TabsContent>
  </Tabs>


</div>


      {/* Account Card */}
    <div className="flex w-full sm:w-1/2 lg:w-full lg:h-full xl:h-[41%] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm mt-5 sm:mt-0">
  <h2 className="mb-4 text-lg font-semibold text-gray-900">
    Account
  </h2>

  {/* Content */}
  <div className="space-y-4 text-sm">
    <div className="flex justify-between">
      <span className="text-gray-500">Margin Ratio</span>
      <span className="font-semibold text-gray-900">0.00%</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Maintenance Margin</span>
      <span className="font-semibold text-gray-900">
        0.000000 USDT
      </span>
    </div>

    <div className="flex justify-between opacity-40">
      <span className="text-gray-500">Margin Balance</span>
      <span className="font-semibold text-gray-900">
        0.000000 USDT
      </span>
    </div>
  </div>

  {/* Spacer pushes content up if needed */}
  <div className="flex-1" />
</div>

    </div>
  )
}

export default OrderSection