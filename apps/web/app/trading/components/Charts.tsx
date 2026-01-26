'use client'
import React, {  useEffect, useMemo, useRef, useState, useTransition } from 'react'
import axios from 'axios'
import { BINANCE_PERIOD_MAP, getChartConfig, PERIOD_BUTTONS, getCandlestickConfig, NEW_PERIOD_BUTTONS, NEW_BINANCE_PERIOD_MAP } from '@/constant'
import { BinanceKline, CandlestickChartProps, ChartCandle, Period } from '@/types/charts';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { useBinanceWebSocket } from '@/hooks/useWebSocket';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const transformKlinesToChartData = (
  klines: BinanceKline[]
): ChartCandle[] =>
  klines.map(([time, open, high, low, close]) => ({
    time: (time / 1000) as UTCTimestamp,
    open: +open,
    high: +high,
    low: +low,
    close: +close,
  }));

const Charts = React.memo(({
  data,
  coinId,
  height = 360,
  initialPeriod = '1s'
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState(initialPeriod)
  const [ohlcData, setOhlcData] = useState<ChartCandle[]>([])

  const lastCandleTimeRef = useRef<UTCTimestamp | null>(null);






  const { ohlcv, isConnected ,currentPrice} = useBinanceWebSocket({
    symbol: coinId,
 interval:period,
  });

  const open = Number(currentPrice?.o);
const close = Number(currentPrice?.c);
  
const chartCurrentPrice =
  Number.isFinite(open) && Number.isFinite(close) && open !== 0
    ? Number((((close - open) / open) * 100).toFixed(3))
    : 0;

const formatted =
  chartCurrentPrice >= 0
    ? `+${chartCurrentPrice}%`
    : `${chartCurrentPrice}%`;




  const fetchOhlcData = async (selectedPeriod: Period) => {
    try {
      const {  limit } = NEW_BINANCE_PERIOD_MAP[selectedPeriod];

      const response = await axios.get(
        'https://testnet.binance.vision/api/v3/klines',
        {
          params: {
            symbol: coinId,
            interval:selectedPeriod,
            limit,
          },
        }
      );

      const rawData = response.data as BinanceKline[];
      const chartData = transformKlinesToChartData(rawData);

      setOhlcData(chartData);
        if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(chartData);
      const lastCandle = chartData.at(-1);
      console.log('dekho last time')
      if (lastCandle) lastCandleTimeRef.current = lastCandle.time;
    }
  }

    catch (error) {
      console.error('Failed to fetch OHLC data', error);
    }
  };

  useEffect(() => {
    fetchOhlcData(period);
  }, [period]);

 
useEffect(() => {
  if (!candleSeriesRef.current || !ohlcv || !isConnected) return;

  const [timestamp, open, high, low, close] = ohlcv;

  const candleTime = (timestamp / 1000) as UTCTimestamp;
  if (lastCandleTimeRef.current && candleTime <= lastCandleTimeRef.current) return;



  const candle: ChartCandle = {
    time: candleTime,
    open,
    high,
    low,
    close,
  };

  candleSeriesRef.current.update(candle);
  lastCandleTimeRef.current = candleTime;
}, [ohlcv, isConnected]);



  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return
 
      setPeriod(newPeriod)
      
  
  }

useEffect(() => {
  if (!candleSeriesRef.current || ohlcData.length === 0) return;

  candleSeriesRef.current.setData(ohlcData);

  const lastCandle = ohlcData.at(-1);
  if (!lastCandle) return;

  lastCandleTimeRef.current = lastCandle.time;

  chartRef.current?.timeScale().fitContent();
}, [ohlcData]);



  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

const showTime =
  period.endsWith('d') ||
  period.endsWith('w') ||
  period.endsWith('M');

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
        layout: {
    background: {
     
      color: '#ffffff', 
    },
    textColor: '#111827',
  },

  grid: {
    vertLines: {
      color: '#e5e7eb',
    },
    horzLines: {
      color: '#e5e7eb',
    },
  },
    });

    const series = chart.addSeries(
      CandlestickSeries,
      getCandlestickConfig()
    );

    chart.timeScale().fitContent()

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0]?.contentRect.width })
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      chart.remove();
      chartRef.current = null
      chartContainerRef.current = null
    }
  }, [height]);

  return (
<div className="w-full h-full rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
  <div className="mb-4 flex items-start justify-between">

    <div>
      <div className="text-sm font-semibold text-gray-900">
       {coinId}
      </div>

      <div className="mt-1 flex items-center gap-3">
        <div className="text-2xl lg:text-[1.7rem] xl:text-3xl font-bold text-gray-900">
          ${Number.isFinite(close) ? close.toFixed(4) : 0}
        </div>

        <div className={`flex items-center rounded-full  px-2.5 py-0.5 text-sm font-semibold ${chartCurrentPrice >= 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-300"}`}>
      {formatted}
        </div>
      </div>
    </div>

  
    <div className=" hidden md:flex  items-center rounded-full border border-gray-200 bg-white p-1 lg:-ml-3">
      {NEW_PERIOD_BUTTONS.map(({ value, label }) => (
        <button
          key={value}
          disabled={loading}
          onClick={() => handlePeriodChange(value)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${period === value? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
       
        >
          {label}
        </button>
      ))}
    </div>
    <div className="md:hidden ">
      
  <Select
    value={period}
    onValueChange={(value:Period) => handlePeriodChange(value)}
    disabled={loading}
    
  >
    <SelectTrigger className="w-full rounded-full border-gray-200 bg-white text-xs font-medium">
      <SelectValue placeholder="Select period" />
    </SelectTrigger>

    <SelectContent className='bg-white'>
      {NEW_PERIOD_BUTTONS.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

  </div>


  <div className="mb-2 text-xs font-medium text-gray-500">
    Period:
    {isConnected && (
      <span className="ml-2 text-green-500">● Live</span>
    )}
  </div>


  <div
    ref={chartContainerRef}
    className="mt-4 w-full rounded-xl "
    style={{ height }}
  />
</div>

  )
})

export default Charts