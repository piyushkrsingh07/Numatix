'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select  from 'react-select'
import { useSymbol } from '@/hooks/useSymbol';
import { useTheme } from '@/hooks/useTheme';
   type Option={
        label:string;
        value:string
    }
const ReactSelect = React.memo(() => {
   
const {currentSymbol,setCurrentSymbol}=useSymbol()
const {isDark}=useTheme()
const [symbols,setSymbols]=useState<Option[]>([])
    const getAllCoins=async()=>{
       try{
         const response=await axios.get('https://testnet.binance.vision/api/v3/exchangeInfo')
         const data=response.data
         const symbol=data.symbols.filter((symbol:Record<string,any>)=>symbol.status === 'TRADING').map((symbol:Record<string,any>)=>symbol.symbol).sort()
         console.log('see final data',data)
         const finalData: Option[]=symbol.map((sym:string)=>({
            label:sym,
            value:sym
         }))
setSymbols(finalData)

       }catch(error){
         console.log(error,'unable to get data')
       }
    }

    useEffect(()=>{
       getAllCoins()
    },[])
  
      const colors = {
    background: isDark ? '#1F2937' : '#ffffff', // light black for dark mode
    hover: isDark ? '#2a2a2a' : '#f3f4f6',
    text: isDark ? '#f9f9f9' : '#111827',
    placeholder: isDark ? '#9ca3af' : '#6b7280',
    border: isDark ? '#333' : '#e5e7eb',
    primary: isDark ? '#3b82f6' : '#d1d5db'
  }
  return (
     <Select 
        placeholder='Search Symbol'
        isClearable
        options={symbols}
        
        onChange={(option)=>setCurrentSymbol(option?.value ?? "")}

  hideSelectedOptions={false}
  menuShouldScrollIntoView={false}
  controlShouldRenderValue={true}
  

  styles={{
    menuList: (base) => ({
      ...base,
      backgroundColor: colors.background,
      padding: 0,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? colors.hover : colors.background,
      color:colors.text,
      cursor: 'pointer',
    }),

    singleValue: (base) => ({
      ...base,
      color:  colors.placeholder,
    }),
  }}

  classNames={{
    container: () => 'w-full',

    control: ({ isFocused }) =>
      `
      min-h-[52px]
      rounded-xl
      bg-gray-100
      border
      ${isFocused ? 'border-gray-400' : 'border-gray-300'}
      px-3
      cursor-pointer
      shadow-none
      ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'}
    `,

    valueContainer: () => 'px-1',

    singleValue: () =>
`text-lg font-semibold ${isDark ? 'text-[#f9f9f9]' : 'text-gray-900'}`,

    placeholder: () =>
      `text-base ${isDark ? 'text-gray-400' : 'text-gray-400'}`,

    indicatorsContainer: () =>
     `text-gray-500`,

    dropdownIndicator: () => 'p-1',
    clearIndicator: () => 'p-1',

    menu: () =>
      `
          mt-2
          rounded-xl
          border
          border-gray-200
          shadow-lg
          overflow-hidden
          ${isDark ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-gray-200'}
    `,

    menuList: () => 'py-2',

    option: ({ isFocused }) =>
      `
          px-4
          py-3
          text-base
          cursor-pointer
          ${isDark ? 'text-[#f9f9f9]' : 'text-gray-900'}
          ${isFocused ? (isDark ? 'bg-[#2a2a2a]' : 'bg-gray-100') : (isDark ? 'bg-[#1a1a1a]' : 'bg-white')}
    `,

    input: () => `text-base ${isDark ? 'text-[#f9f9f9]' : 'text-gray-900'}`,
  }}

  theme={(theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
      ...theme.colors,
          primary: colors.primary,
          primary25: colors.hover,
          neutral0: colors.background,
          neutral80: colors.text,
          neutral50: colors.placeholder,
    },
  })}
        />
  )
})

export default ReactSelect