'use client'
import { io,Socket } from "socket.io-client";
import React, { useEffect } from "react"
import { createContext, useState } from "react"

interface SocketProviderProps {
    children?:React.ReactNode
}

export interface ISocketContext {
  socketInstance: Socket|null
}
const SocketContext=createContext<ISocketContext | undefined>(undefined)

export const SocketContextProvider=({children}:SocketProviderProps)=>{
 const [socketInstance,setSocketInstance]=useState<Socket|null>(null)

 useEffect(()=>{
const socket=io('ws://localhost:1000',{
    auth:{
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJwaXl1c2gwMjA0MEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRYNzgyQVdnRVczVmprWUhzdlhXekJ1NFV2SmVybnFnVzN2ME1aQllRa3lER2N5MlVCNGN6UyIsImlhdCI6MTc2OTI1NDMxMiwiZXhwIjoxNzY5MjcyMzEyfQ._NUMcmoWkPOsk9D114MWoCZydwSZD5HrF3AnnsJTjC4"
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
})
return ()=>{
    socket.disconnect()
}
 },[])





 return (
    <SocketContext.Provider value={{socketInstance}}>
       {children}
    </SocketContext.Provider>
 )
}

export default SocketContext