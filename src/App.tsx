import React, { useState, useEffect, useCallback, useRef } from 'react'
import BubbleField from './components/BubbleField'
import ScoreBoard from './components/ScoreBoard'
import GameControls from './components/GameControls'
import AudioManager, { AudioManagerHandle } from './components/AudioManager'

function App() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isPlaying, setIsPlaying] = useState(false)
  const [difficulty, setDifficulty] = useState('normal')
  const [audioManagerKey, setAudioManagerKey] = useState(0)
  const audioManagerRef = useRef<AudioManagerHandle>(null)

  useEffect(() => {
    let timer: number
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsPlaying(false)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  const handlePop = useCallback(() => {
    setScore((prevScore) => prevScore + 1)
    audioManagerRef.current?.playPopSound()
  }, [])

  const startGame = () => {
    setScore(0)
    setTimeLeft(60)
    setIsPlaying(true)
    setAudioManagerKey(prev => prev + 1)
  }

  const handleDifficultyChange = (newDifficulty: string) => {
    setDifficulty(newDifficulty)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">捏泡泡</h1>
      <ScoreBoard score={score} timeLeft={timeLeft} />
      <GameControls
        isPlaying={isPlaying}
        onStart={startGame}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      {isPlaying && (
        <BubbleField onPop={handlePop} difficulty={difficulty} />
      )}
      {!isPlaying && timeLeft === 0 && (
        <div className="text-2xl font-bold text-white mt-4">游戏结束！</div>
      )}
      <AudioManager 
        key={audioManagerKey} 
        isPlaying={isPlaying} 
        ref={audioManagerRef}
      />
    </div>
  )
}

export default App