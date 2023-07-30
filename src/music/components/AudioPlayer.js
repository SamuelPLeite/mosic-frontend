import React, { useState, useRef } from 'react'

import { PlayIcon, PauseIcon } from './Icons'
import './AudioPlayer.css'

const AudioPlayer = ({ audioUrl, handlePlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)


  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState)
    handlePlaying((prevState) => !prevState)
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const handleOnEnded = () => {
    setIsPlaying(false)
    handlePlaying(false)
  }

  return (
    <div className="audio-player">
      <button className="audio-player__btn" onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <audio ref={audioRef} src={audioUrl} onEnded={handleOnEnded} />
    </div>
  )
}

export default AudioPlayer