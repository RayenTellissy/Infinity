import React, { useEffect, useRef, useState } from 'react';

// hooks
import useLocalStorage from '@/hooks/useLocalStorage';

// videoplayer buttons
import PlayButton from './PlayerButtons/PlayButton';
import VolumeButton from './PlayerButtons/VolumeButton/VolumeButton';
import MiniplayerButton from './PlayerButtons/MiniplayerButton';
import FullscreenButton from './PlayerButtons/FullscreenButton';
import Duration from './PlayerButtons/Duration';
import PlaybackSpeedButton from './PlayerButtons/PlaybackSpeedButton';

type VideoPlayerProps = {
  videoUrl: string
}

var timeoutId: NodeJS.Timeout
const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying,setIsPlaying] = useState(false)
  const [isFullscreen,setIsFullscreen] = useState(false)
  const [fullscreenControls,setFullscreenControls] = useState(false)
  const [inMini,setInMini] = useState(false)
  const [volumeState,setVolumeState] = useState<"muted" | "low" | "medium" | "high">("high")
  const [videoDuration,setVideoDuration] = useState<number | null>(null)
  const [currentTime,setCurrentTime] = useState<number | null>(null)
  const [playbackSpeed,setPlaybackSpeed] = useState(1)
  const playerRef = useRef<HTMLVideoElement>(null)
  const videoContainer = document.getElementById("video-container")
  const video = document.querySelector("video")
  const buttonHoverEffect = "opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out"
  const { getItem, setItem } = useLocalStorage("volume")

  useEffect(() => {
    handleAutoplay()
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    video?.addEventListener("enterpictureinpicture", () => setInMini(true))
    video?.addEventListener("leavepictureinpicture", () => setInMini(false))
    video?.addEventListener("volumechange", handleVolumeChange)
    video?.addEventListener("loadeddata", handleTotalDuration)
    video?.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      video?.removeEventListener("enterpictureinpicture", () => setInMini(true))
      video?.removeEventListener("leavepictureinpicture", () => setInMini(false))
    }
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
    // if we are tabbed into an input element, return
    const activeElement = document.activeElement?.tagName.toUpperCase()
    if(activeElement === "INPUT") return

    // when space bar is pressed toggle play
    if(e.key === " ") {
      if(activeElement === "BUTTON") return
      togglePlay()
    }
    if(e.key.toLowerCase() === "f") {
      toggleFullscreen()
    }
    if(e.key.toLowerCase() === "i") {
      toggleMiniPlayer()
    }
    if(e.key.toLowerCase() === "i") {
      toggleMute()
    }
    if(e.key.toLowerCase() === "arrowright") {
      skip(5)
    }
    if(e.key.toLowerCase() === "arrowleft") {
      skip(-5)
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

  const toggleMute = () => {
    if(!video) return
    video.muted = !video.muted
  }

  // volume state management used to change the volume icon
  const handleVolumeChange = () => {
    if(!video) return
    if(video.volume === 0 || video.muted) return setVolumeState("muted")
    if(video.volume > 0 && video.volume <= 0.3) return setVolumeState("low")
    if(video.volume > 0.3 && video.volume <= 0.8) return setVolumeState("medium")
    if(video.volume > 0.8) return setVolumeState("high")
  }

  const changeVolume = (volume: number) => {
    if(!video) return
    // if the video is muted and the user drags the slider, the video will be unmuted.
    if(volume !== 0) {
      video.muted = false
    }
    video.volume = volume
  }

  const handleTotalDuration = () => {
    if(!video) return
    setVideoDuration(video.duration)
  }

  const handleTimeUpdate = () => {
    if(!video) return
    setCurrentTime(video.currentTime)
  }

  const skip = (duration: number) => {
    if(!video) return
    video.currentTime += duration
  }

  const changePlaybackSpeed = () => {
    if(!video) return
    let newPlaybackSpeed = video.playbackRate + .25
    if(newPlaybackSpeed > 2) {
      newPlaybackSpeed = .25
    }
    video.playbackRate = newPlaybackSpeed
    setPlaybackSpeed(newPlaybackSpeed)
  }

  return <div id='video-container' className='group w-[90%] max-w-[950px] flex justify-center m-2 relative'>
    {(!isFullscreen || (isFullscreen && fullscreenControls)) && <div
      className={`absolute group-hover:opacity-100 ${isPlaying ? "opacity-0" : "opacity-100"}
      bottom-0 left-0 right-0 text-white z-[100] transition-opacity duration-200 ease-in-out`}
    >
      <div id='video-player-controls-background' className='video-player-controls-background rounded'/>
      <div className='flex items-center gap-3 p-4 justify-between'>
        <div className='flex flex-row gap-6 w-[250px]'>
          <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} buttonHoverEffect={buttonHoverEffect} />
          <VolumeButton volumeState={volumeState} toggleMute={toggleMute} changeVolume={changeVolume} buttonHoverEffect={buttonHoverEffect} />
          <Duration duration={videoDuration} currentTime={currentTime} />
        </div>
        <div className='flex flex-row items-center gap-6'>
          <PlaybackSpeedButton playbackSpeed={playbackSpeed} changePlaybackSpeed={changePlaybackSpeed} />
          <MiniplayerButton buttonHoverEffect={buttonHoverEffect} toggleMiniPlayer={toggleMiniPlayer} inMini={inMini} />
          <FullscreenButton isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} buttonHoverEffect={buttonHoverEffect} />
        </div>
      </div>
    </div>}
    <video ref={playerRef} className='w-full rounded' src={videoUrl} onClick={togglePlay}/>
  </div>
};

export default VideoPlayer;