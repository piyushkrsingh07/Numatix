import {
  CandlestickSeriesPartialOptions,
  ChartOptions,
  ColorType,
  DeepPartial,
} from 'lightweight-charts';

type Period = 'daily' | 'weekly' | 'monthly' | '3months' | '6months' | 'yearly' | 'max';
type NewPeriod='1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1d'|'1w'|'1h'

export const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Search',
    href: '/',
  },
  {
    label: 'All Coins',
    href: '/coins',
  },
];

const CHART_COLORS = {
  background: '#0b1116',
  text: '#8f9fb1',
  grid: '#1a2332',
  border: '#1a2332',
  crosshairVertical: '#ffffff40',
  crosshairHorizontal: '#ffffff20',
  candleUp: '#158A6E',
  candleDown: '#EB1C36',
} as const;

export const getCandlestickConfig = (): CandlestickSeriesPartialOptions => ({
  upColor: CHART_COLORS.candleUp,
  downColor: CHART_COLORS.candleDown,
  wickUpColor: CHART_COLORS.candleUp,
  wickDownColor: CHART_COLORS.candleDown,
  borderVisible: true,
  wickVisible: true,
});

export const getChartConfig = (
  height: number,
  timeVisible: boolean = true,
): DeepPartial<ChartOptions> => ({
  width: 0,
  height,
  layout: {
    background: { type: ColorType.Solid, color: CHART_COLORS.background },
    textColor: CHART_COLORS.text,
    fontSize: 12,
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial',
  },
  grid: {
    vertLines: { visible: false },
    horzLines: {
      visible: true,
      color: CHART_COLORS.grid,
      style: 2,
    },
  },
  rightPriceScale: {
    borderColor: CHART_COLORS.border,
  },
  timeScale: {
    borderColor: CHART_COLORS.border,
    timeVisible,
    secondsVisible: false,
  },
  handleScroll: true,
  handleScale: true,
  crosshair: {
    mode: 1,
    vertLine: {
      visible: true,
      color: CHART_COLORS.crosshairVertical,
      width: 1,
      style: 0,
    },
    horzLine: {
      visible: true,
      color: CHART_COLORS.crosshairHorizontal,
      width: 1,
      style: 0,
    },
  },
  localization: {
    priceFormatter: (price: number) =>
      '$' + price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
  },
});

export type BinanceInterval =
  | '1s'
  | '1m' | '3m' | '5m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '6h' | '8h' | '12h'
  | '1d' | '3d'
  | '1w'
  | '1M';


export const BINANCE_PERIOD_MAP: Record<
  Period,
  { interval: BinanceInterval; limit: number }
> = {
  daily:    { interval: '1h', limit: 24 },
  weekly:   { interval: '1h', limit: 7 * 24 },
  monthly:  { interval: '4h', limit: 30 * 6 },
  '3months':{ interval: '1d', limit: 90 },
  '6months':{ interval: '1d', limit: 180 },
  yearly:   { interval: '1d', limit: 365 },
  max:      { interval: '1d', limit: 1000 }, // Binance max
};


export const PERIOD_BUTTONS: { value: Period; label: string }[] = [
  { value: 'daily', label: '1D' },
  { value: 'weekly', label: '1W' },
  { value: 'monthly', label: '1M' },
  { value: '3months', label: '3M' },
  { value: '6months', label: '6M' },
  { value: 'yearly', label: '1Y' },
  { value: 'max', label: 'Max' },
];

export const NEW_BINANCE_PERIOD_MAP: Record<
  NewPeriod,
  { interval: BinanceInterval; limit: number }
> = {
  '1s':  { interval: '1s',  limit: 1000 }, // ~16 minutes
  '1m':  { interval: '1m',  limit: 1000 }, // ~16 hours
  '3m':  { interval: '3m',  limit: 1000 }, // ~50 hours
  '5m':  { interval: '5m',  limit: 1000 }, // ~3.5 days
  '15m': { interval: '15m', limit: 1000 }, // ~10 days
  '30m': { interval: '30m', limit: 1000 }, // ~20 days
   '1h': { interval: '1h', limit: 1000 },
   '1d': { interval: '1d', limit: 1000 },
   '1w':{ interval: '1w', limit: 1000 },
};

export const NEW_PERIOD_BUTTONS:{value:NewPeriod;label:string}[]=[
  {value:'1s',label:'1s'},
  {value:'1m',label:'1m'},
  {value:'3m',label:'3m'},
   {value:'5m',label:'5m'},
    {value:'15m',label:'15m'},
  {value:'30m',label:'30m'},
  {value:'1h',label:'1h'},
  {value:'1d',label:'1d'},
  {value:'1w',label:'1w'}
]

export const LIVE_INTERVAL_BUTTONS: { value: '1s' | '1m'; label: string }[] = [
  { value: '1s', label: '1s' },
  { value: '1m', label: '1m' },
];