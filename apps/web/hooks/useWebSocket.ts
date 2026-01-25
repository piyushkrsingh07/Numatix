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

  useEffect(() => {
    if (!symbol || !interval) return;

    // ✅ PROD WS (market data ONLY lives here)
    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WS connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data: KlineMessage = JSON.parse(event.data);
      const k = data.k;

      setOhlcv([
        k.t,
        +k.o,
        +k.h,
        +k.l,
        +k.c,
      ]);
    };

    ws.onerror = (e) => {
      console.error('❌ WS error', e);
    };

    ws.onclose = () => {
      console.log('🔌 WS closed');
      setIsConnected(false);
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [symbol, interval]);

  return { ohlcv, isConnected };
}
