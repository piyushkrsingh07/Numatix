'use client'

import { createContext, useState } from "react";


export interface PriceProps {
    children:React.ReactNode
}

export interface PricePropsType {
  closeprice:number;
 setClosePrice:React.Dispatch<React.SetStateAction<number>>
}

const PriceContext=createContext<PricePropsType|undefined>(undefined)


export const PriceContextProvider=({children}:PriceProps)=>{
    const [closeprice,setClosePrice]=useState<number>(0)
    return (
        <PriceContext.Provider value={{closeprice,setClosePrice}}>
            {children}
        </PriceContext.Provider>
    )
}

export default PriceContext