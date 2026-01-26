'use client'

import React from 'react'

const HeaderSection = () => {
  return (
    <header className="w-full rounded-2xl border border-gray-100 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-inner" />
          <span className="text-lg font-semibold tracking-wide text-gray-900">
            NUMATIX
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Trading Pill */}
          <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live trading
            <svg
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Theme Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m11.314 11.314l-1.414-1.414"
              />
            </svg>
          </button>

          {/* Camera Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h4l2-3h6l2 3h4v12H3V7z"
              />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </button>

          {/* Avatar */}
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gray-300" />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderSection
