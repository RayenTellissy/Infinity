import React, { useEffect, useRef, useState } from 'react';

// icons
import { Play, Pause, Maximize, Minimize } from 'lucide-react';
import Miniplayer from '@/assets/icons/Miniplayer';

// preset
import { buttonHoverEffect } from './style';

type VideoPlayerProps = {
  videoUrl: string
}

var timeoutId: NodeJS.Timeout
const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying,setIsPlaying] = useState(false)
  const [isFullscreen,setIsFullscreen] = useState(false)
  const [fullscreenControls,setFullscreenControls] = useState(false)
  const playerRef = useRef<HTMLVideoElement>(null)
  const videoContainer = document.getElementById("video-container")
  const video = document.querySelector("video")

  useEffect(() => {
    handleAutoplay()
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [video, videoContainer])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isFullscreen])
  
  const togglePlay = () => {
    if(playerRef.current?.paused) {
      playerRef.current.play()
      return setIsPlaying(true)
    }
    playerRef.current?.pause()
    setIsPlaying(false)
  }

  const toggleFullscreen = () => {
    if(!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen()
      setIsFullscreen(true)
    }
    else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const toggleMiniPlayer = () => {
    if(!document.pictureInPictureElement && video) {
      video.requestPictureInPicture()
    }
    else {
      document.exitPictureInPicture()
    }
  }
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // when space bar is pressed toggle play
    if(e.key === " ") {
      togglePlay()
    }
    if(e.key.toUpperCase() === "F") {
      toggleFullscreen()
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

  // a function to handle showing and hiding player controls when in fullscreen
  const handleMouseMove = async () => {
    if(!isFullscreen) return

    setFullscreenControls(true)

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setFullscreenControls(false)
    }, 3000)
  }

  return <div id='video-container' className='group w-[90%] max-w-[950px] flex justify-center m-2 relative'>
    {(!isFullscreen || (isFullscreen && fullscreenControls)) && <div
      className={`absolute group-hover:opacity-100 ${isPlaying ? "opacity-0" : "opacity-100"}
      bottom-0 left-0 right-0 text-white z-[100] transition-opacity duration-200 ease-in-out`}
    >
      <div className='video-player-controls-background rounded'/>
      <div className='flex items-center gap-3 p-4 justify-between'>
        <button className={`flex flex-row ${buttonHoverEffect}`} onClick={togglePlay}>
          {!isPlaying ? <Play fill="white" size={40} />
          : <Pause fill='white' size={40}/>}
        </button>
        <div className='flex flex-row gap-6'>
          <button className={buttonHoverEffect} onClick={toggleMiniPlayer}>
            <Miniplayer />
          </button>
          <button className={buttonHoverEffect} onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={40} /> : <Maximize size={40} />}
          </button>
        </div>
      </div>
    </div>}
    <video ref={playerRef} className='w-full rounded' src={videoUrl} onClick={togglePlay}/>
  </div>
};

export default VideoPlayer;