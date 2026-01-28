'use client'
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { getSymbolPosition, getUserOrder } from "@/app/config/accountConfig"

export const useOrder=()=>{
    const {auth}=useAuth()

    const {isFetching,isSuccess,error,isLoading,data:orders}=useQuery({
                
                queryKey:[`getUserOrder-${auth?.user?.email}`],
                queryFn:({queryKey})=>{
                  if(!auth) return
              return getUserOrder(auth?.token as string)
                },
                 enabled: Boolean( auth?.token),
                 refetchOnWindowFocus: false,
        
                // staleTime:10000
    })

        return {
        isFetching,
        isSuccess,
        error,
        orders
    }
}