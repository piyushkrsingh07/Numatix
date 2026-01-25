'use client'
import React, { startTransition, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import axios from 'axios'
import { BINANCE_PERIOD_MAP, getChartConfig, PERIOD_BUTTONS, getCandlestickConfig } from '@/constant'
import { BinanceKline, CandlestickChartProps, ChartCandle, Period } from '@/types/charts';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { useBinanceWebSocket } from '@/hooks/useWebSocket';

type CandlestickData = {
  time: number;   // unix seconds (NOT ms)
  open: number;
  high: number;
  low: number;
  close: number;
};

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
  initialPeriod = 'daily'
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)

  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState(initialPeriod)
  const [ohlcData, setOhlcData] = useState<ChartCandle[]>([])
  const [isPending, setTransition] = useTransition()
  const lastCandleTimeRef = useRef<UTCTimestamp | null>(null);


  // Get interval from period
  const getIntervalFromPeriod = (selectedPeriod: Period): '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M' => {
    const intervalMap: Record<Period, '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1M'> = {
      'daily': '1h',
      'weekly': '4h',
      'monthly': '1d',
      '3months': '1d',
      '6months': '1w',
      'yearly': '1w',
      'max': '1M',
    };
    return intervalMap[selectedPeriod];
  };
const interval = useMemo(
  () => getIntervalFromPeriod(period),
  [period]
);

  // WebSocket hook for real-time data
  const { ohlcv, isConnected } = useBinanceWebSocket({
    symbol: coinId,
 interval,
  });

  const fetchOhlcData = async (selectedPeriod: Period) => {
    try {
      const { interval, limit } = BINANCE_PERIOD_MAP[selectedPeriod];

      const response = await axios.get(
        'https://testnet.binance.vision/api/v3/klines',
        {
          params: {
            symbol: coinId,
            interval,
            limit,
          },
        }
      );

      const rawData = response.data as BinanceKline[];
      const chartData = transformKlinesToChartData(rawData);

      setOhlcData(chartData);
    } catch (error) {
      console.error('Failed to fetch OHLC data', error);
    }
  };

  useEffect(() => {
    fetchOhlcData(period);
  }, [period]);

  // Update chart with real-time WebSocket data
useEffect(() => {
  if (!candleSeriesRef.current || !ohlcv || !isConnected) return;

  const [timestamp, open, high, low, close] = ohlcv;

  const candleTime = (timestamp / 1000) as UTCTimestamp;
  const lastTime = lastCandleTimeRef.current;

  // 🚨 HARD RULE: never update older candles
  if (lastTime && candleTime < lastTime) {
    return;
  }

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
    startTransition(async () => {
      setPeriod(newPeriod)
      await fetchOhlcData(newPeriod)
    })
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

    const showTime = ['daily', 'weekly', 'monthly'].includes(period);

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
    <div id="candlestick-chart">
      <div className='chart-header'>
        <div className='button-group'>
          <span className='text-sm mx-2 font-medium text-purple-50'>
            Period: {isConnected && <span className='text-green-400 ml-2'>● Live</span>}
          </span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={period === value ? 'config-button-active bg-green-600' : 'config-button'}
              onClick={() => handlePeriodChange(value)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div ref={chartContainerRef} className='chart' style={{ height }} />
    </div>
  )
}

export default Charts