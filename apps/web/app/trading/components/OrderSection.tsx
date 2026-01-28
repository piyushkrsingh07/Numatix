'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import OrderForm from './OrderForm'
import axios from 'axios'
import Select  from 'react-select'
import ReactSelect from './Select'
import { Separator } from '@/components/ui/separator'
import dynamic from "next/dynamic";
import { useGetUserAccount } from '@/hooks/useGetUserAccount'
import { useTheme } from '@/hooks/useTheme'


  const DynamicSelect = dynamic(() => import("./Select"), {
  ssr: false,
});

const OrderSection = React.memo(() => {



console.log("OrderSection render");

const {account,isFetching}=useGetUserAccount()


const accountInfo=account?.data
const {isDark}=useTheme()

  const bgCard = isDark ? 'bg-gray-800' : 'bg-white'
  const borderCard = isDark ? 'border-gray-700' : 'border-gray-100'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500'
  const bgTab = isDark ? 'bg-gray-700' : 'bg-gray-50'
  const tabText = isDark ? 'text-gray-300' : 'text-gray-400'
  const tabTextActive = isDark ? 'text-white' : 'text-gray-900'
  const separatorColor = isDark ? 'bg-gray-600' : 'bg-gray-300'
  const iconBg = isDark ? 'bg-gray-600' : 'bg-gray-100'
  const iconColor = isDark ? 'text-gray-200' : 'text-gray-700'


  return (
    <div className="flex-col  sm:flex sm:flex-row h-full w-full  gap-6 lg:flex-col">
      {/* Portfolio Card */}
     <div className={`w-full sm:w-1/2 lg:w-full rounded-2xl border ${borderCard} p-2 shadow-sm h-[70%] ${bgCard}`}>
    
  {/* Title */}
  <h2 className={`mb-4 text-lg font-semibold ${textPrimary}`}>
    Portfolio
  </h2>
   <DynamicSelect/>
    
<Separator className={`w-full my-4 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />


  <Tabs defaultValue="BUY" className='mt-2'>
    <TabsList className={`mb-1 rounded-full border ${isDark ? 'border-gray-700' : 'border-gray-100'} ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-1`}>
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

 
    <TabsContent value="BUY" className="mt-4">
      <Tabs defaultValue="LIMIT">
        {/* LIMIT / MARKET / STOP */}
        <TabsList    className={`mb-4 inline-flex w-full rounded-full border ${isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-1 gap-2`}
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
            value="STOP_MARKET"
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
        <TabsContent value='STOP_MARKET'>
       <OrderForm parentValue="BUY" childValue="STOP_MARKET"/>
        </TabsContent>
        
      </Tabs>
    </TabsContent>


    <TabsContent value="SELL" className="mt-4">
     <Tabs defaultValue="LIMIT">
      
        <TabsList  className={`mb-4 inline-flex w-auto rounded-full border ${isDark ? 'border-gray-700' : 'border-gray-200'} ${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-1 gap-2`}
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
            value="STOP_MARKET"
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

 
        <TabsContent value="LIMIT">
       
           <OrderForm parentValue="SELL" childValue="LIMIT"/>
         
        </TabsContent>
        <TabsContent value='MARKET'>
           <OrderForm parentValue="SELL" childValue="MARKET"/>
        </TabsContent>
        <TabsContent value='STOP_MARKET'>
           <OrderForm parentValue="SELL" childValue="STOP_MARKET"/>
        </TabsContent>
        
      </Tabs>
    </TabsContent>
  </Tabs>


</div>



<div
  className={`flex w-full sm:w-1/2 lg:w-full lg:h-full xl:h-full flex-col rounded-2xl border ${isDark ? 'border-gray-800 bg-gray-800' : 'border-gray-100'} px-5 pt-3 mt-5 sm:mt-0 gap-y-5 ${isDark ? 'bg-gray-700' : 'bg-white'}`}
>
  <h2 className={`text-lg font-semibold ${isDark ? 'text-white mt-1' : 'text-gray-900'}`}>
    Account
  </h2>

  {/* Top content */}
  <div className="mt-4 space-y-4 text-sm">
    <div className="flex justify-between">
      <span  className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Free USDT Balance</span>
      <span  className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {accountInfo?.freeUSDTBalance ?? 0}
      </span>
    </div>

    <div className="flex justify-between">
      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Locked USDT Balance</span>
      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {accountInfo?.lockedUSDTBalance ?? 0}
      </span>
    </div>

    <div className="flex justify-between">
      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total USDT Balance</span>
      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {accountInfo?.totalUSDTBalance ?? 0}
      </span>
    </div>
  </div>




  <div className="flex items-center justify-center gap-3 mt-4 pt-2">
    <div  className={`flex h-10 w-10 items-center justify-center rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
      className={` ${isDark ? 'text-gray-200 text-white  h-7 w-7' : 'text-gray-700 h-5 w-5'}`} 
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12v4a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v4zm0 0h-4a2 2 0 00-2 2 2 2 0 002 2h4"
        />
      </svg>
    </div>

    <div className="flex flex-col">
      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Available Balance
      </span>
      <span  className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {accountInfo?.totalUSDTBalance ?? 0} USDT
      </span>
    </div>
  </div>
</div>

</div>
 
  


  )
})

export default OrderSection