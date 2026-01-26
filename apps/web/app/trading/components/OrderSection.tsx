import React from 'react'

const OrderSection = () => {
  return (
    <div className="flex h-full w-full  gap-6 lg:flex-col">
      {/* Portfolio Card */}
      <div className="w-1/2 xl:h-[59%] lg:w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Portfolio
        </h2>

        {/* Buy / Sell Toggle */}
        <div className="mb-4 inline-flex overflow-hidden rounded-full border border-gray-200">
          <button className="px-6 py-2 text-sm font-semibold text-gray-900">
            BUY
          </button>
          <button className="px-6 py-2 text-sm font-medium text-gray-400">
            SELL
          </button>
        </div>

        {/* Order Type Tabs */}
        <div className="mb-5 flex gap-6 border-b text-sm font-medium">
          <span className="border-b-2 border-purple-500 pb-2 text-gray-900">
            Limit
          </span>
          <span className="pb-2 text-gray-400">
            Market
          </span>
          <span className="pb-2 text-gray-400">
            Stop Market
          </span>
        </div>

        {/* Limit Price */}
        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-500">
            Limit price
          </label>
          <div className="flex items-center rounded-lg border px-3 py-2">
            <input
              type="text"
              value="4,076.67"
              readOnly
              className="w-full text-sm text-gray-900 outline-none"
            />
            <span className="text-sm font-medium text-gray-500">
              USDT
            </span>
          </div>
        </div>

        {/* Quantity + Total */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Quantity
            </label>
            <div className="flex items-center rounded-lg border px-3 py-2">
              <input
                type="text"
                value="0.0001"
                readOnly
                className="w-full text-sm text-gray-900 outline-none"
              />
              <span className="text-sm font-medium text-gray-500">
                BTC
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-500">
              Total
            </label>
            <div className="flex items-center rounded-lg border px-3 py-2">
              <input
                type="text"
                value="= 1.62204"
                readOnly
                className="w-full text-sm text-gray-900 outline-none"
              />
              <span className="text-sm font-medium text-gray-500">
                USDT
              </span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-4">
          <div className="relative h-2 rounded-full bg-gray-200">
            <div className="absolute left-0 top-0 h-2 w-[90%] rounded-full bg-purple-500" />
          </div>
          <div className="mt-2 text-right text-sm font-semibold text-gray-700">
            90%
          </div>
        </div>

        {/* Balance + Add Funds */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <span className="inline-block h-4 w-4 rounded border border-gray-400" />
            30.16 USD
          </div>

          <button className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-600">
            Add funds
          </button>
        </div>

        {/* Buy Button */}
        <button className="w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white shadow-inner">
          Buy BTC/USD
        </button>
      </div>

      {/* Account Card */}
    <div className="flex w-1/2 lg:w-full lg:h-full xl:h-[41%] flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
  <h2 className="mb-4 text-lg font-semibold text-gray-900">
    Account
  </h2>

  {/* Content */}
  <div className="space-y-4 text-sm">
    <div className="flex justify-between">
      <span className="text-gray-500">Margin Ratio</span>
      <span className="font-semibold text-gray-900">0.00%</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Maintenance Margin</span>
      <span className="font-semibold text-gray-900">
        0.000000 USDT
      </span>
    </div>

    <div className="flex justify-between opacity-40">
      <span className="text-gray-500">Margin Balance</span>
      <span className="font-semibold text-gray-900">
        0.000000 USDT
      </span>
    </div>
  </div>

  {/* Spacer pushes content up if needed */}
  <div className="flex-1" />
</div>

    </div>
  )
}

export default OrderSection