import { UTCTimestamp } from "lightweight-charts";

export type BinanceKline = [
  number, // openTime
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  number, // closeTime
  string, // quoteAssetVolume
  number, // numberOfTrades
  string, // takerBuyBaseVolume
  string, // takerBuyQuoteVolume
  string  // ignore
];

export type ChartCandle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type OHLCData = [
  number, // timestamp
  number, // open
  number, // high
  number, // low
  number, // close
];

export type PriceData = {
  symbol: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  timestamp: number;
};

export type Trade = {
  price: number;
  quantity?: number;
  value?: number;
  timestamp: number;
  isBuyerMaker?: boolean;
  tradeId?: number;
  type?: string;
  amount?: number;
};

export interface UseBinanceWebSocketProps {
  symbol: string;
  interval?: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M';
}

export interface UseBinanceWebSocketReturn {
  price: PriceData | null;
  trades: Trade[];
  ohlcv: OHLCData | null;
  isConnected: boolean;
}

// export type Period = 'daily' | 'weekly' | 'monthly' | '3months' | '6months' | 'yearly' | 'max';
export type Period='1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'1d'|'1w'

export interface CandlestickChartProps {
  data?: ChartCandle[];
  liveOhlcv?: ChartCandle | null;
  coinId: string;
  height?: number;
  children?: React.ReactNode;
  mode?: 'historical' | 'live';
  initialPeriod?: Period;
  liveInterval?: '1s' | '1m';
  setLiveInterval?: (interval: '1s' | '1m') => void;
}

export interface placeOrder {
  symbol:string;
  side:string;
  type:string;
  quantity:string;
  price?:string;
  stopPrice?:string;
  timeInForce?:string;
}