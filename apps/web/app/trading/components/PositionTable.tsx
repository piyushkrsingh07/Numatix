'use client'

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { usePosition } from '@/hooks/usePosition'
import { useOrder } from '@/hooks/useUserOrder'
import { TabsList } from '@radix-ui/react-tabs'
import { Search } from 'lucide-react'
import React, { useState,useEffect } from 'react'

const PositionTable = () => {
 const {position,isFetching} =usePosition()
 const {orders}=useOrder()

 

 const PAGE_SIZE = 5
 const [visibleCount, setVisibleCount] = useState<number>(5)
 const positionInfo=position?.data
 const orderInfo=orders?.data?.order

 console.log(positionInfo,typeof positionInfo,'dekho position')

 console.log(orderInfo,'dekho user order')
 useEffect(() => {
  setVisibleCount(PAGE_SIZE)
}, [orderInfo])

const totalOrders = orderInfo?.length ?? 0

  return (
   <div className="w-full rounded-2xl border border-gray-200 bg-white p-6">
  {/* Title */}
  <div className="mb-4 text-sm font-semibold text-gray-600">
    Positions & Orders
  </div>

 
  <Tabs defaultValue="ORDER" className="w-full">
    <div className="flex items-center justify-between">
      
     
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

        
      </TabsList>




    </div>
<TabsContent value='POSITION'>
    <div className="rounded-xl border border-gray-200 bg-white">
  <Table className="w-full border-separate border-spacing-y-2">
  <TableHeader>
    <TableRow className="border-none">
      <TableHead className="text-gray-400 font-medium">Transaction</TableHead>
      <TableHead className="text-gray-400 font-medium">Size</TableHead>
      <TableHead className="text-gray-400 font-medium">Entry price</TableHead>
      <TableHead className="text-gray-400 font-medium">Market price</TableHead>
      <TableHead className="text-gray-400 font-medium">Realized PnL</TableHead>
      <TableHead className="text-gray-400 font-medium text-right">
        Unrealized PnL
      </TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {(Array.isArray(positionInfo) ? positionInfo : [positionInfo]).map(
      (pos, idx) => {
        const isLong = pos?.size > 0;

        return (
          <TableRow
            key={idx}
            className="bg-white rounded-xl shadow-sm border-none"
          >
     
            <TableCell className="font-medium flex items-center gap-3 py-4">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full
                  ${isLong ? "bg-green-100" : "bg-red-100"}`}
              >
                <span
                  className={`text-sm font-bold
                    ${isLong ? "text-green-600" : "text-red-600"}`}
                >
                  {isLong ? "↑" : "↓"}
                </span>
              </span>

              <span className="text-gray-900">{pos?.symbol}</span>
            </TableCell>


            <TableCell
              className={`font-semibold ${
                isLong ? "text-green-600" : "text-red-600"
              }`}
            >
              {pos?.size}
            </TableCell>

          
            <TableCell className="text-gray-700">
              ${Number(pos?.entryPrice).toLocaleString()}
            </TableCell>

           
            <TableCell className="text-gray-700">
              ${Number(pos?.marketPrice).toLocaleString()}
            </TableCell>

       
            <TableCell
              className={`font-semibold ${
                pos?.realizedPnl >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <div>+${Number(pos?.realizedPnl).toFixed(6)}</div>
              <div className="text-xs opacity-70">
                ({pos?.realizedPnl >= 0 ? "+" : ""}
                {((pos?.realizedPnl / pos?.entryPrice) * 100).toFixed(1)}%)
              </div>
            </TableCell>

            {/* UNREALIZED */}
            <TableCell
              className={`text-right font-semibold ${
                pos?.unrealizedPnl >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <div>+${Number(pos?.unrealizedPnl).toFixed(6)}</div>
              <div className="text-xs opacity-70">
                ({pos?.unrealizedPnl >= 0 ? "+" : ""}
                {((pos?.unrealizedPnl / pos?.entryPrice) * 100).toFixed(1)}%)
              </div>
            </TableCell>
          </TableRow>
        );
      }
    )}
  </TableBody>
</Table>

  </div>
</TabsContent>
        <TabsContent value="ORDER">
          <div className="rounded-md ">
            <div
              className="max-h-[320px] overflow-y-auto"
              onScroll={(e) => {
                const target = e.currentTarget
                const reachedBottom =
                  target.scrollTop + target.clientHeight >=
                  target.scrollHeight - 20

                if (reachedBottom && visibleCount < totalOrders) {
                  setVisibleCount((prev) =>
                    Math.min(prev + PAGE_SIZE, totalOrders)
                  )
                }
              }}
            >
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="border-none">
                    <TableHead className="text-gray-400 font-medium">Symbol</TableHead>
                    <TableHead className="text-gray-400 font-medium">Type</TableHead>
                    <TableHead className="text-gray-400 font-medium">Side</TableHead>
                    <TableHead className="text-gray-400 font-medium">Price</TableHead>
                    <TableHead className="text-gray-400 font-medium">Amount</TableHead>
                    <TableHead className="text-gray-400 font-medium">Filled</TableHead>
                    <TableHead className="text-gray-400 font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orderInfo
                    ?.slice(-visibleCount)
                    .map((order: any, index: number) => (
                      <TableRow key={index} className='border-none'>
                        <TableCell>
                          {order?.command?.symbol}
                        </TableCell>

                        <TableCell>
                          {order?.command?.type}
                        </TableCell>

                        <TableCell
                          className={
                            order?.command?.side === 'BUY'
                              ? 'text-green-600 font-semibold'
                              : 'text-red-600 font-semibold'
                          }
                        >
                          {order?.command?.side}
                        </TableCell>

                        <TableCell>
                          {order?.price === '0'
                            ? 'Market'
                            : order?.price}
                        </TableCell>

                        <TableCell>{order?.quantity}</TableCell>

                        <TableCell>
                          {order?.status === 'FILLED'
                            ? order?.quantity
                            : '0'}
                        </TableCell>

                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              order.status === 'FILLED'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order?.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>






  </Tabs>
</div>

  )
}

export default PositionTable
