'use client'

import { deleteCookie, getCookie } from "cookies-next"
import { createContext, useEffect, useState } from "react";

export interface User {
    id:number;
  email:string;
   
}

export interface AuthState {
    user:User|null,
    token:string|null,
    isLoading:boolean
}

export interface AuthProps {
    children:React.ReactNode
}

export interface AuthContextType {
  auth:AuthState;
  setAuth:React.Dispatch<React.SetStateAction<AuthState>>
}
const AuthContext=createContext<AuthContextType|undefined>(undefined)

export const AuthContextProvider=({children}:AuthProps)=>{

    const [auth,setAuth]=useState<AuthState>({
        user:null,
        token:null,
        isLoading:true
    })
            const cookieUser=getCookie('user')
 
        const cookieToken = getCookie('token')
              useEffect(()=>{

          if (      typeof cookieUser !== "string" ||
      typeof cookieToken !== "string") {
    setAuth(prev => ({ ...prev, isLoading: false }))
    return
  }

          console.log(cookieToken,JSON.parse(cookieUser),'see user and token in auth provider')
      try{
  setAuth({
                user:JSON.parse(cookieUser),
                token:cookieToken,
                isLoading:false
            })
            
      }catch(error){
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
          
               },[cookieUser,cookieToken])

  
  return (
    <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext