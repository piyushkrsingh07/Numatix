'use client'

import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import React from 'react'

const PositionTable = () => {
  return (
    <Tabs defaultValue="POSITION" className='mt-2'>
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


        
      </Tabs>
    </TabsContent>
  </Tabs>
  )
}

export default PositionTable
