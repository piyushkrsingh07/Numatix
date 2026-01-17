'use client'

import { createContext, useState } from "react"
import { boolean } from "zod";

export interface ThemeProps{
    children:React.ReactNode
}

export interface ThemeContextType {
    isDark:boolean;
   setIsDark:React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider=({children}:ThemeProps)=>{

    const [isDark,setIsDark]=useState<boolean>(false)
   return (
    <ThemeContext.Provider value={{isDark,setIsDark}}>
        {children}
    </ThemeContext.Provider>
   )
}

export default ThemeContext