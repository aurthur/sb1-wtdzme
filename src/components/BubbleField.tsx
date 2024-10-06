import React, { useState, useEffect } from 'react'
import Bubble from './Bubble'

interface BubbleFieldProps {
  onPop: () => void
  difficulty: string
}

const BubbleField: React.FC<BubbleFieldProps> = ({ onPop, difficulty }) => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; color: string }[]>([])

  useEffect(() => {
    const maxBubbles = difficulty === 'easy' ? 15 : difficulty === 'normal' ? 20 : 25
    const spawnRate = difficulty === 'easy' ? 1500 : difficulty === 'normal' ? 1000 : 750

    const interval = setInterval(() => {
      if (bubbles.length < maxBubbles) {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`
        }
        setBubbles(prevBubbles => [...prevBubbles, newBubble])
      }
    }, spawnRate)

    return () => clearInterval(interval)
  }, [bubbles, difficulty])

  const handlePop = (id: number) => {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id))
    onPop()
  }

  return (
    <div className="w-full max-w-3xl h-96 bg-white bg-opacity-30 rounded-lg relative overflow-hidden">
      {bubbles.map(bubble => (
        <Bubble
          key={bubble.id}
          id={bubble.id}
          x={bubble.x}
          y={bubble.y}
          color={bubble.color}
          onPop={handlePop}
        />
      ))}
    </div>
  )
}

export default BubbleField