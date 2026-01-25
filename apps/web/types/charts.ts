import { UTCTimestamp } from "lightweight-charts";

export type BinanceKline= [
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

export type Period = 'daily' | 'weekly' | 'monthly' | '3months' | '6months' | 'yearly' | 'max';
 export interface CandlestickChartProps {
  data?:  ChartCandle[];
   liveOhlcv?: ChartCandle | null;
  coinId: string;
  height?: number;
  children?: React.ReactNode;
  mode?: 'historical' | 'live';
  initialPeriod?: Period;
  liveInterval?: '1s' | '1m';
  setLiveInterval?: (interval: '1s' | '1m') => void;
}