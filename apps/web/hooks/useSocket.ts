'use client'

import SocketContext from "@/context/SocketContext"
import { useContext } from "react"

export const useSocket=()=>{
    const context= useContext(SocketContext)

      if (!context) {
    throw new Error(
      "useTheme must be used within ThemeContextProvider"
    );
  }
  return context
}