import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

interface AudioManagerProps {
  isPlaying: boolean
}

export interface AudioManagerHandle {
  playPopSound: () => void
}

const AudioManager = forwardRef<AudioManagerHandle, AudioManagerProps>(({ isPlaying }, ref) => {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null)
  const popSoundRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (backgroundMusicRef.current) {
      if (isPlaying) {
        backgroundMusicRef.current.play().catch(error => console.error("Error playing background music:", error))
      } else {
        backgroundMusicRef.current.pause()
        backgroundMusicRef.current.currentTime = 0
      }
    }
  }, [isPlaying])

  const playPopSound = () => {
    if (popSoundRef.current) {
      popSoundRef.current.currentTime = 0
      popSoundRef.current.play().catch(error => console.error("Error playing pop sound:", error))
    }
  }

  useImperativeHandle(ref, () => ({
    playPopSound
  }))

  return (
    <>
      <audio ref={backgroundMusicRef} loop>
        <source src="/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={popSoundRef}>
        <source src="/pop-sound.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  )
})

export default AudioManager