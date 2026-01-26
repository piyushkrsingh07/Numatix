'use client'

import { createContext, useState } from "react"


export interface SymbolProps {
    children:React.ReactNode
}

export interface SymbolPropsType {
  currentSymbol:string;
  setCurrentSymbol:React.Dispatch<React.SetStateAction<string>>
}

const SymbolContext=createContext<SymbolPropsType|undefined>(undefined)

export const SymbolContextProvider=({children}:SymbolProps)=>{
    const [currentSymbol,setCurrentSymbol]=useState("BTCUSDT")
   return (
    <SymbolContext.Provider value={{currentSymbol,setCurrentSymbol}}>
            {children}
    </SymbolContext.Provider>
   )
}
export default SymbolContext