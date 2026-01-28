'use client'

import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import { Search } from 'lucide-react'
import React from 'react'

const PositionTable = () => {
  return (
   <div className="w-full rounded-2xl border border-gray-200 bg-white p-6">
  {/* Title */}
  <div className="mb-4 text-sm font-semibold text-gray-600">
    Positions & Orders
  </div>

  {/* Header Row */}
  <Tabs defaultValue="TRADES" className="w-full">
    <div className="flex items-center justify-between">
      
      {/* Tabs */}
      <TabsList
        className="
          flex rounded-full border border-gray-200 
          bg-gray-50 
        "
      >
        <TabsTrigger
          value="POSITION"
          className="
            rounded-full px-6 py-2 text-sm font-medium
            text-gray-400
            data-[state=active]:bg-white
            data-[state=active]:text-gray-900
            data-[state=active]:shadow
          "
        >
          Positions
        </TabsTrigger>

        <TabsTrigger
          value="ORDER"
          className="
            rounded-full px-6 py-2 text-sm font-medium
            text-gray-400
            data-[state=active]:bg-white
            data-[state=active]:text-gray-900
            data-[state=active]:shadow
          "
        >
          Orders
        </TabsTrigger>

        <TabsTrigger
          value="TRADES"
          className="
            rounded-full px-6 py-2 text-sm font-medium
            text-gray-400
            data-[state=active]:bg-white
            data-[state=active]:text-gray-900
            data-[state=active]:shadow
          "
        >
          Trades
        </TabsTrigger>
        
      </TabsList>


<div className="relative w-[30%]">


  <Input
    placeholder="Search"
    className="
      h-9
      rounded-full
      pl-9 pr-4
      text-sm
    "
  />
</div>


    </div>
<TabsContent value='POSITION'>
   
</TabsContent>
<TabsContent value='ORDER'>

</TabsContent>

<TabsContent value='TRADES'>

</TabsContent>

  </Tabs>
</div>

  )
}

export default PositionTable
