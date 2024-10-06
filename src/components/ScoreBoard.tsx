import React from 'react'

interface ScoreBoardProps {
  score: number
  timeLeft: number
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, timeLeft }) => {
  return (
    <div className="bg-white bg-opacity-50 rounded-lg px-6 py-2 mb-4 flex justify-between w-full max-w-md">
      <p className="text-2xl font-bold text-purple-800">得分: {score}</p>
      <p className="text-2xl font-bold text-purple-800">时间: {timeLeft}s</p>
    </div>
  )
}

export default ScoreBoard