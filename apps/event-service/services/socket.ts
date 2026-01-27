import { Server as HttpServer } from "http"
import { Server as SocketIOServer,Socket } from "socket.io";
import jwt, { JwtPayload } from 'jsonwebtoken'


let io:SocketIOServer

let roomId:string;
export  const initializeSocket = (server: HttpServer) => {
   io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket,next)=>{
    try{
    const token=socket.handshake.auth.token
    if(!token){
        return next(new Error('No token provided'))
    }
   const jwtresponse= jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload
   console.log(jwtresponse,'see jwt response')

   socket.data.userId=jwtresponse.id
   next();
    }catch(error){
        return next(new Error("Invalid token provided"))
    }


  })
 
  io.on('connection',(socket:Socket)=>{
    console.log('new socket connected',socket.id)
     const userId=socket.data.userId

      socket.join(socket.id)
      roomId=socket.id
           console.log(roomId,'see which room joined')

  })


}

export const emitOrderToSocket=(userId:string,data:Record<string,any>)=>{
    console.log(data,'data jo bhja hai')
    console.log(data.type,'see dataa type')
    console.log(roomId,'bhjna s phle room')
     io.to(roomId).emit(data.type,data)
}


