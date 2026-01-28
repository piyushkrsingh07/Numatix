'use client'
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { getSymbolPosition } from "@/app/config/accountConfig"
import { useSymbol } from "./useSymbol"

export const usePosition=()=>{
    const {auth}=useAuth()
     const {currentSymbol}=useSymbol()

     console.log(currentSymbol,'see currebnt symbol piyush')
    const {isFetching,isSuccess,error,isLoading,data:position}=useQuery({
                
                queryKey:['getSymbolPosition', currentSymbol],
                queryFn:({queryKey})=>{
                  if(!auth) return
              return getSymbolPosition(auth?.token as string,currentSymbol as string)
                },
                 enabled: Boolean( auth?.token),
                 refetchOnWindowFocus: false,
        
                // staleTime:10000
    })

        return {
        isFetching,
        isSuccess,
        error,
        position
    }
}