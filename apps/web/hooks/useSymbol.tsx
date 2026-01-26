'use client'
import SymbolContext from "@/context/SymbolProvider"
import { useContext } from "react"

export const useSymbol=()=>{
    const context=useContext(SymbolContext)
    if(!context){
        throw new Error(
            "use Symbol not properly configured"
        )
    }
    return context
}