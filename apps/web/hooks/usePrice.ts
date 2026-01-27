'use client'

import PriceContext from "@/context/LimitPriceContext"
import { useContext } from "react"

export const usePrice=()=>{
    const context=useContext(PriceContext)
    if(!context){
        throw new Error(
            "use Price hook not properly configured"
        )
    }
    return context
}