'use client'
import React, {  useEffect, useMemo, useRef, useState, useTransition } from 'react'
import axios from 'axios'
import { BINANCE_PERIOD_MAP, getChartConfig, PERIOD_BUTTONS, getCandlestickConfig, NEW_PERIOD_BUTTONS, NEW_BINANCE_PERIOD_MAP } from '@/constant'
import { BinanceKline, CandlestickChartProps, ChartCandle, Period } from '@/types/charts';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { useBinanceWebSocket } from '@/hooks/useWebSocket';


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

const Charts = ({
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
    <div id="w-full h-full">
      <div className='chart-header'>
        <div className='button-group'>
          <span className='text-sm mx-2 font-medium text-purple-50'>
            Period: {isConnected && <span className='text-green-400 ml-2'>● Live</span>}
          </span>
          {NEW_PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={period === value ? 'config-button-active bg-green-600' : 'config-button'}
              onClick={() => handlePeriodChange(value)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
          <div>${currentPrice?.c}</div>
          <div className={formatted?'text-green-700':'text-red-700'}>{formatted}</div>
        </div>
      </div>

      <div ref={chartContainerRef} className='chart' style={{ height }} />
    </div>
  )
}

export default Charts