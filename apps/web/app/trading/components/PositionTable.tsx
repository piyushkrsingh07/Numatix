'use client'

import React from 'react'

const PositionTable = () => {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        {/* Tabs */}
        <div className="flex overflow-hidden rounded-full border border-gray-200 text-sm font-medium">
          <button className="bg-white px-5 py-2 text-gray-900">
            Positions
          </button>
          <button className="border-l border-gray-200 px-5 py-2 text-gray-400">
            Orders
          </button>
          <button className="border-l border-gray-200 px-5 py-2 text-gray-400">
            Trades
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead className="border-b border-gray-100 text-gray-500">
            <tr>
              <th className="px-6 py-4 text-left font-medium">
                Transaction
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Size
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Entry price
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Market price
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Realized PnL
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Unrealized PnL
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {/* BTC */}
            <tr className="border-b border-gray-100">
              <td className="flex items-center gap-3 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                  <span className="text-lg text-red-500">↓</span>
                </div>
                <span className="font-semibold text-gray-900">
                  BTC/USDT
                </span>
              </td>

              <td className="px-6 py-5 text-red-500 font-medium">
                20
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-green-500">
                <div>+$680</div>
                <div className="text-xs">(+1.6%)</div>
              </td>

              <td className="px-6 py-5 text-green-500">
                <div>+$450</div>
                <div className="text-xs">(+1.9%)</div>
              </td>

              <td className="px-6 py-5 text-gray-400">
                ✎
              </td>
            </tr>

            {/* ETH */}
            <tr className="border-b border-gray-100">
              <td className="flex items-center gap-3 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
                  <span className="text-lg text-green-500">↑</span>
                </div>
                <span className="font-semibold text-gray-900">
                  ETH/USDT
                </span>
              </td>

              <td className="px-6 py-5 text-green-500 font-medium">
                1.2
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-green-500">
                <div>+$350</div>
                <div className="text-xs">(+0.5%)</div>
              </td>

              <td className="px-6 py-5 text-green-500">
                <div>$280</div>
                <div className="text-xs">(+3.1%)</div>
              </td>

              <td className="px-6 py-5 text-gray-400">
                ✎
              </td>
            </tr>

            {/* SOL (faded row) */}
            <tr className="opacity-40">
              <td className="flex items-center gap-3 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                  <span className="text-lg text-red-500">↓</span>
                </div>
                <span className="font-semibold text-gray-900">
                  SOL/USDT
                </span>
              </td>

              <td className="px-6 py-5 text-red-500 font-medium">
                22
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-gray-600">
                $ 42,560
              </td>

              <td className="px-6 py-5 text-red-500">
                <div>-$90</div>
                <div className="text-xs">(-4.3%)</div>
              </td>

              <td className="px-6 py-5 text-red-500">
                <div>-$110</div>
                <div className="text-xs">(-4.2%)</div>
              </td>

              <td className="px-6 py-5 text-gray-400">
                ✎
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PositionTable
