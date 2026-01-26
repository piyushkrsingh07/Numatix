'use client'

export default function LeftSide() {
  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-400 to-blue-800" />

      {/* Diagonal overlays */}
      <div className="absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-full w-[120%] rotate-[-20deg] bg-black/30" />
        <div className="absolute -right-1/4 top-1/3 h-full w-[120%] rotate-[-20deg] bg-black/50" />
      </div>

      {/* Content */}
     
    </div>
  )
}
