'use client'

import AuthContext from "@/context/AuthContext"
import { useContext } from "react"

export const useAuth=()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw new Error(
            "Auth context not properly configured"
        )
    }
    return context
}