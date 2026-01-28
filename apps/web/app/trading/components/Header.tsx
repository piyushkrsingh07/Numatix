'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { useGetUserAccount } from '@/hooks/useGetUserAccount'
import { useTheme } from '@/hooks/useTheme'
import { LogOutIcon, Wallet } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const HeaderSection = () => {

  const {auth,logout}=useAuth()
  const {account,isFetching}=useGetUserAccount()
  
  
  const accountInfo=account?.data

  const handleLogout=async()=>{
    await logout()
    toast.success('Successfully loggedout')
  }

  const {isDark,setIsDark}=useTheme()
  return (
    <header className={`w-full rounded-2xl border border-gray-100 px-6 py-3 shadow-sm ${isDark?'bg-gray-800':'bg-white'}`}>
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-inner" />
          <span className={`text-lg font-semibold tracking-wide  ${isDark?'text-white':'text-gray-900'}`}>
            NUMATIX
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Trading Pill */}
          <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-[14.2px] py-[14.2px] sm:px-2 sm:py-2 text-sm font-medium text-gray-900 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 " />
            <p className='hidden sm:block'>Live trading</p>
        
          </button>

          {/* Theme Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50" onClick={()=>setIsDark(prev=>!prev)}>
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m11.314 11.314l-1.414-1.414"
              />
            </svg>
          </button>

         

          {/* Avatar */}
     
    <DropdownMenu>
<DropdownMenuTrigger asChild>
  <button
    className="
      relative
      flex items-center justify-center
      h-10 w-10
      rounded-full
      border border-gray-200
      bg-white
      hover:bg-gray-100
      hover:opacity-90
      transition

      outline-none
      focus:outline-none
      focus:ring-0
      focus:ring-offset-0
      focus-visible:outline-none
      focus-visible:ring-0
      focus-visible:ring-offset-0
    "
  >
    <Avatar className="h-9 w-9">
      <AvatarFallback
        className="
          flex items-center justify-center
          h-full w-full
          bg-gray-200
          text-gray-700
          font-semibold
          text-2xl
        "
      >
        {String(auth?.user?.email?.[0] || "P").toUpperCase() }
      </AvatarFallback>
    </Avatar>
  </button>
</DropdownMenuTrigger>


  <DropdownMenuContent
    align="end"
    className="w-40 rounded-xl p-1 bg-white"
  >
    <DropdownMenuGroup>
    <DropdownMenuItem
      onClick={handleLogout}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
    </DropdownMenuGroup>

<DropdownMenuSeparator className="my-2 mx-3 h-px bg-black opacity-100" />
         <DropdownMenuGroup>

 
<DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2">
  <div className="flex flex-col gap-1">
    

    <div className="flex items-center gap-2">
      <Wallet className="h-4 w-4 text-gray-600" />
      <span className="text-md font-semibold text-gray-500">
        AVAILABLE BALANCE
      </span>
    </div>

   
    <div className="text-center ml-3 text-sm font-bold text-gray-900">
      {accountInfo?.totalUSDTBalance ?? 0}
    </div>

  </div>
</DropdownMenuItem>

   
         </DropdownMenuGroup>

  </DropdownMenuContent>


</DropdownMenu>

        </div>
      </div>
    </header>
  )
}

export default HeaderSection
