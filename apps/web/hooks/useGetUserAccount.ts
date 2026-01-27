'use client'
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { fetchUserAccount } from "@/app/config/accountConfig"



export const useGetUserAccount=()=>{
 const {auth}=useAuth()

    const {isFetching,isSuccess,error,isLoading,data:account}=useQuery({
        
        queryKey:[`getUserAccount-${auth?.user?.email}`],
        queryFn:({queryKey})=>{
          if(!auth) return
      return fetchUserAccount(auth?.token as string)
        },
         enabled: Boolean( auth?.token),
         refetchOnWindowFocus: false,

        // staleTime:10000
    })

    return {
        isFetching,
        isSuccess,
        error,
        account
    }
}