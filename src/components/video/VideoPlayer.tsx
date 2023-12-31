"use client"
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
import Timeline from './PlayerButtons/Timeline/Timeline';

// components
import VideoBuffer from '@/components/common/VideoBuffer';

type VideoPlayerProps = {
  videoUrl: string
}

var timeoutId: NodeJS.Timeout
var isScrubbing = false

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isPlaying,setIsPlaying] = useState(true)
  const [isFullscreen,setIsFullscreen] = useState(false)
  const [fullscreenControls,setFullscreenControls] = useState(false)
  const [inMini,setInMini] = useState(false)
  const [volume,setVolume] = useState(0.5)
  const [volumeState,setVolumeState] = useState<"muted" | "low" | "medium" | "high">("high")
  const [videoDuration,setVideoDuration] = useState<number | null>(null)
  const [currentTime,setCurrentTime] = useState<number | null>(null)
  const [playbackSpeed,setPlaybackSpeed] = useState(1)
  const [isBuffering,setIsBuffering] = useState<boolean | null>(null)
  const [scrubbingTime,setScrubbingTime] = useState<number | null>(null)
  const playerRef = useRef<HTMLVideoElement>(null)
  const videoContainer = document.getElementById("video-container")
  const video = document.querySelector("video")
  const buttonHoverEffect = "opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out"
  const { getItem, setItem } = useLocalStorage("volume")
  const timelineContainer = document.getElementById("timeline-container")
  
  useEffect(() => {
    handleSavedVolume()
    window.addEventListener("keydown", handleKeyDown)
    video?.addEventListener("enterpictureinpicture", () => setInMini(true))
    video?.addEventListener("leavepictureinpicture", () => setInMini(false))
    video?.addEventListener("volumechange", handleVolumeChange)
    video?.addEventListener("loadeddata", () => {
      handleTotalDuration()
    })
    video?.addEventListener("timeupdate", handleTimeUpdate)
    timelineContainer?.addEventListener("mousemove", handleTimelineUpdate)
    timelineContainer?.addEventListener("mousedown", toggleScrubbing)
    document.addEventListener("mouseup", e => {
      if(isScrubbing) toggleScrubbing(e)
    })
    document.addEventListener("mousemove", e => {
      if(isScrubbing) handleTimelineUpdate(e)
    })
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      video?.removeEventListener("enterpictureinpicture", () => setInMini(true))
      video?.removeEventListener("leavepictureinpicture", () => setInMini(false))
      video?.removeEventListener("volumechange", handleVolumeChange)
      video?.removeEventListener("loadeddata", () => {
        handleTotalDuration()
      })
      video?.removeEventListener("timeupdate", handleTimeUpdate)
      timelineContainer?.removeEventListener("mousemove", handleTimelineUpdate)
      timelineContainer?.removeEventListener("mousedown", toggleScrubbing)
      document.removeEventListener("mouseup", e => {
        if(isScrubbing) toggleScrubbing(e)
      })
      document.removeEventListener("mousemove", e => {
        if(isScrubbing) handleTimelineUpdate(e)
      })
    }
  }, [video, videoContainer, timelineContainer])

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
    const activeElement = document.activeElement?.tagName.toLowerCase()
    if(activeElement === "input") return

    // when space bar is pressed toggle play
    if(e.key === " ") {
      if(activeElement === "button") return
      togglePlay()
    }
    else if(e.key.toLowerCase() === "f") {
      toggleFullscreen()
    }
    else if(e.key.toLowerCase() === "i") {
      toggleMiniPlayer()
    }
    else if(e.key.toLowerCase() === "i") {
      toggleMute()
    }
    else if(e.key.toLowerCase() === "arrowright") {
      skip(5)
    }
    else if(e.key.toLowerCase() === "arrowleft") {
      skip(-5)
    }
    else if(e.key.toLowerCase() === "m") {
      toggleMute()
    }
    else if(e.key.toLowerCase() === "arrowdown") {
      decreaseVolume()
    }
    else if(e.key.toLowerCase() === "arrowup") {
      increaseVolume()
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
    setVolume(video.muted ? 0 : video.volume)
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
    setVolume(volume)
    setItem(volume)
  }
  
  const handleSavedVolume = () => {
    const savedVolume = getItem()
    if(savedVolume) {
      changeVolume(savedVolume)
    }
  }

  const handleTotalDuration = () => {
    if(!video) return
    setVideoDuration(video.duration)
  }

  const handleTimeUpdate = () => {
    if(!video || isNaN(video.duration)) return
    setCurrentTime(video.currentTime)
    // updating the progress for timeline
    timelineContainer?.style.setProperty("--progress-position", `${video.currentTime / video.duration}`)
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

  const handleTimelineUpdate = (e: MouseEvent) => {
    const rect = timelineContainer?.getBoundingClientRect()
    if(!rect || !video || !video.duration) return
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    setScrubbingTime(percent * video.duration)
    timelineContainer?.style.setProperty("--preview-position", String(percent))

    if(isScrubbing) {
      e.preventDefault()
      timelineContainer?.style.setProperty("--progress-position", String(percent))
    }
  }

  const toggleScrubbing = async (e: MouseEvent) => {
    const rect = timelineContainer?.getBoundingClientRect()
    if(!rect || !video || !video.duration) return
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
    isScrubbing = (e.buttons & 1) === 1
    
    if(isScrubbing) {
      video?.pause()
      setIsPlaying(false)
    }
    else {
      video.currentTime = percent * video.duration
      if(video.paused) {
        await video.play()
        setIsPlaying(true)
      }
    }

    handleTimelineUpdate(e)
  }

  const increaseVolume = () => {
    if(!video || video.volume === 1) return
    if(video.volume > 0.95) return video.volume = 1
    video.volume += 0.05
    setVolume(video.volume + 0.05)
  }

  const decreaseVolume = () => {
    if(!video || video.volume === 0) return
    if(video.volume < 0.05) return video.volume = 0
    video.volume -= 0.05
    setVolume(video.volume - 0.05)
  }

  return <div id='video-container' className='group flex justify-center relative'>
    {(!isFullscreen || (isFullscreen && fullscreenControls)) && <div
      className={`absolute group-hover:opacity-100 ${isPlaying ? "opacity-0" : "opacity-100"}
      bottom-0 left-0 right-0 text-white z-[100] transition-opacity duration-200 ease-in-out`}
    >
      <div className='video-player-controls-background rounded'/>
      <Timeline scrubbingTime={scrubbingTime} />
      <div className='flex items-center gap-3 p-4 justify-between'>
        <div className='flex flex-row gap-6 w-[250px]'>
          <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} buttonHoverEffect={buttonHoverEffect} />
          <VolumeButton
            volume={volume}
            volumeState={volumeState}
            toggleMute={toggleMute}
            changeVolume={changeVolume}
            buttonHoverEffect={buttonHoverEffect}
          />
          <Duration duration={videoDuration} currentTime={currentTime} />
        </div>
        <div className='flex flex-row items-center gap-6'>
          <PlaybackSpeedButton playbackSpeed={playbackSpeed} changePlaybackSpeed={changePlaybackSpeed} />
          <MiniplayerButton buttonHoverEffect={buttonHoverEffect} toggleMiniPlayer={toggleMiniPlayer} inMini={inMini} />
          <FullscreenButton isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} buttonHoverEffect={buttonHoverEffect} />
        </div>
      </div>
    </div>}
    {isBuffering && <VideoBuffer />}
    <video
      autoPlay
      preload='none'
      onWaiting={() => setIsBuffering(true)}
      onCanPlay={() => setIsBuffering(false)}
      ref={playerRef}
      className='w-full rounded aspect-video bg-black'
      src={videoUrl}
      onClick={togglePlay}
    />
  </div>
};

export default VideoPlayer;