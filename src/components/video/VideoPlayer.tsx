import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

// preset
import { buttonHoverEffect } from './style';

type VideoPlayerProps = {
  videoUrl: string
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying,setIsPlaying] = useState(false)
  const playerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    handleAutoplay()
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
  
  const togglePlay = () => {
    if(playerRef.current?.paused) {
      playerRef.current.play()
      return setIsPlaying(true)
    }
    playerRef.current?.pause()
    setIsPlaying(false)
  }
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // when space bar is pressed toggle play
    if(e.key === " ") {
      document.getElementById("video-player-play-button")?.click()
    }
  }

  // a workaround function, because browsers dont support autoplay with unmuted playback
  const handleAutoplay = () => {
    if(playerRef.current) {
      playerRef.current.muted = true
      playerRef.current.play()
      setIsPlaying(true)
      playerRef.current.muted = false
    }
  }

  return <div className='group w-[90%] max-w-[950px] flex justify-center m-2 relative'>
    <div
      className={`absolute ${isPlaying ? "opacity-0" : "opacity-1"} group-hover:opacity-100 bottom-0 left-0 z-[100]
      transition-opacity duration-100 ease-in-out`}
    >
      <div className='absolute bottom-0 w-full z-0 pointer-events-none'>
        <div className='bg-gradient-to-t from-black to-transparent w-full aspect-w-6 aspect-h-1' />
      </div>
      <div className='flex items-center gap-3 p-4'>
        <button id='video-player-play-button' className='flex flex-row' onClick={togglePlay}>
          {!isPlaying ? <Play className={`${buttonHoverEffect}`} fill="white" size={40} />
          : <Pause className={`${buttonHoverEffect}`} fill='white' size={40}/>}
        </button>
      </div>
    </div>
    <button id='sadasidbas'></button>
    <video ref={playerRef} className='w-full rounded' src={videoUrl} onClick={togglePlay}/>
  </div>
};

export default VideoPlayer;