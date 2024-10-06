import React from 'react'

interface BubbleProps {
  id: number
  x: number
  y: number
  color: string
  onPop: (id: number) => void
}

const Bubble: React.FC<BubbleProps> = ({ id, x, y, color, onPop }) => {
  return (
    <div
      className="absolute w-12 h-12 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 animate-pulse"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
      onClick={() => onPop(id)}
    />
  )
}

export default Bubble