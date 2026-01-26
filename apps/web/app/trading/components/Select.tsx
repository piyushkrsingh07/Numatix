import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select  from 'react-select'
import { useSymbol } from '@/hooks/useSymbol';
   type Option={
        label:string;
        value:string
    }
const ReactSelect = React.memo(() => {
   
const {currentSymbol,setCurrentSymbol}=useSymbol()
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
      backgroundColor: '#ffffff',
      padding: 0,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f3f4f6' : '#ffffff',
      color: '#111827',
      cursor: 'pointer',
    }),

    singleValue: (base) => ({
      ...base,
      color: '#111827',
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
      ${isFocused ? 'border-gray-300' : 'border-gray-200'}
      px-3
      cursor-pointer
      shadow-none
    `,

    valueContainer: () => 'px-1',

    singleValue: () =>
      'text-lg font-semibold text-gray-900',

    placeholder: () =>
      'text-base text-gray-400',

    indicatorsContainer: () =>
      'text-gray-500',

    dropdownIndicator: () => 'p-1',
    clearIndicator: () => 'p-1',

    menu: () =>
      `
      mt-2
      rounded-xl
      border
      border-gray-200
      bg-white
      shadow-lg
      overflow-hidden
    `,

    menuList: () => 'py-2',

    option: ({ isFocused }) =>
      `
      px-4
      py-3
      text-base
      cursor-pointer
      text-gray-900
      ${isFocused ? 'bg-gray-100' : 'bg-white'}
    `,

    input: () => 'text-base text-gray-900',
  }}

  theme={(theme) => ({
    ...theme,
    borderRadius: 12,
    colors: {
      ...theme.colors,
      primary: '#d1d5db',
      primary25: '#f3f4f6',
      neutral0: '#ffffff',
      neutral80: '#111827',
      neutral50: '#9ca3af', 
    },
  })}
        />
  )
})

export default ReactSelect