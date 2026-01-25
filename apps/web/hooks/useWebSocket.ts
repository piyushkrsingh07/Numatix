'use client';

import { useEffect, useRef, useState } from 'react';

type KlineMessage = {
  k: {
    t: number;
    o: string;
    h: string;
    l: string;
    c: string;
  };
};

type Props = {
  symbol: string;
  interval: string;
};

export function useBinanceWebSocket({ symbol, interval }: Props) {
  const socketRef = useRef<WebSocket | null>(null);
  const [ohlcv, setOhlcv] = useState<[number, number, number, number, number] | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const prevSocketRef=useRef<WebSocket|null>(null)
  const [currentPrice,setCurrentPrice]=useState<Record<string,any>>({})
  useEffect(() => {
    if (!symbol || !interval) return;
      

    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
console.log(socketRef.current,'jb change hua')



   const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WS connected');
      setIsConnected(true);
      console.log(socketRef.current,'sseing socket referce')
    };

    ws.onmessage = (event) => {
      // console.log(event,'dekho event')
      const data: KlineMessage = JSON.parse(event.data);
      console.log(data,'dekh data')
      const k = data.k;

      setOhlcv([
        k.t,
        +k.o,
        +k.h,
        +k.l,
        +k.c,
      ]);
      setCurrentPrice(data.k)
    };

    ws.onerror = (e) => {

      console.error('❌ WS error', e);
    };

  ws.onclose=()=>{
    console.log(prevSocketRef.current,'before closing')
    if(socketRef.current === prevSocketRef.current) {
    console.log('socket closed')

    setIsConnected(false)
    }

  }


    return () => {
console.log('cleanup runs')

prevSocketRef.current=socketRef.current
console.log(prevSocketRef.current,'cleanup old')
ws.close()
   

    };
  }, [symbol, interval]);

  return { ohlcv, isConnected,currentPrice};
}
