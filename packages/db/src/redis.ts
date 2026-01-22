import Redis from "ioredis";
import "dotenv/config";
const pub=new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    username:'default',
    password:process.env.REDIS_PASSWORD
})

const sub = new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    username:'default',
    password:process.env.REDIS_PASSWORD
})

export const redisConfig={
    pub,
    sub
}