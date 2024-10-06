import React from 'react'

interface GameControlsProps {
  isPlaying: boolean
  onStart: () => void
  difficulty: string
  onDifficultyChange: (difficulty: string) => void
}

const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  onStart,
  difficulty,
  onDifficultyChange,
}) => {
  return (
    <div className="mb-4 flex flex-col items-center">
      {!isPlaying && (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={onStart}
          >
            开始游戏
          </button>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                difficulty === 'easy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onDifficultyChange('easy')}
            >
              简单
            </button>
            <button
              className={`px-3 py-1 rounded ${
                difficulty === 'normal'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onDifficultyChange('normal')}
            >
              普通
            </button>
            <button
              className={`px-3 py-1 rounded ${
                difficulty === 'hard'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onDifficultyChange('hard')}
            >
              困难
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default GameControls