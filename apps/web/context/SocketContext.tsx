'use client'
import { io,Socket } from "socket.io-client";
import React, { useEffect } from "react"
import { createContext, useState } from "react"
import { getCookie } from "cookies-next";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface SocketProviderProps {
    children?:React.ReactNode
}

export interface ISocketContext {
  socketInstance: Socket|null
}
const SocketContext=createContext<ISocketContext | undefined>(undefined)

export const SocketContextProvider=({children}:SocketProviderProps)=>{
 const [socketInstance,setSocketInstance]=useState<Socket|null>(null)
 const {auth}=useAuth()
 const cookieToken = auth?.token

 useEffect(()=>{
    console.log(cookieToken,'see toje je')
const socket=io('ws://localhost:8000',{
    auth:{
        token:cookieToken
    }
})
setSocketInstance(socket)
socket.on("connect",()=>{
    console.log("socket connect",socket.id)
})

socket.on("disconnect",()=>{
    console.log("Socket disconnected")
})
socket.on("ORDER_UPDATE",(data)=>{
    console.log(data,'delho data jo ayaya')
    toast.success("order successfully placed")
})
socket.on("ORDER_ERROR",(data)=>{
    console.log(data,'ERROR AAYA JO')
    toast.error(data.data)
})
return ()=>{
    socket.disconnect()
}
 },[cookieToken])





 return (
    <SocketContext.Provider value={{socketInstance}}>
       {children}
    </SocketContext.Provider>
 )
}

export default SocketContext