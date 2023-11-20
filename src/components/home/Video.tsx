import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image"

// helpers
import formatDuration from '@/helpers/formatDuration';
import returnProgressValue from '@/helpers/returnProgressValue';
import formatViews from '@/helpers/formatViews';
import formatCreatedAt from '@/helpers/formatCreatedAt';

// ui components
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// components
import UserAvatar from '@/components/common/UserAvatar';

type VideoProps = {
  id: string
  title: string
  thumbnail: string
  duration: number
  videoUrl: string
  ownerUsername: string
  ownerImage: string
  created_at: Date
  views: number
}

const Video = ({ id, title, thumbnail, duration, videoUrl, views, created_at, ownerUsername, ownerImage }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [previewProgress, setPreviewProgress] = useState(0)
  const [previewMax, setPreviewMax] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    videoRef?.current?.addEventListener("timeupdate", handlePreviewTime)

    return () => videoRef.current?.removeEventListener("timeupdate", handlePreviewTime)
  }, [])

  const handlePreviewTime = () => {
    if (!videoRef.current) return
    setPreviewProgress(videoRef.current.currentTime)
  }

  const handlePlaying = (isPlaying: boolean) => {
    if (videoRef.current === null) return

    setIsPlaying(isPlaying)
    setPreviewMax(videoRef.current.duration)

    if (isPlaying) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
    else {
      videoRef.current.pause()
    }
  }

  const navigateToChannel = (e: React.MouseEvent) => {
    window.location.href = `/channel/${ownerUsername}`
    e.stopPropagation()
  }

  return (
    <div
      className='aspect-video cursor-pointer'
      onMouseEnter={() => handlePlaying(true)}
      onMouseLeave={() => handlePlaying(false)}
      onClick={() => window.location.href = `/video/${id}`}
    >
      <div className='relative w-full'>
        <div className='relative'>
          <Image
            alt='video thumbnail'
            height={152}
            width={270}
            className={`w-full h-full object-fill aspect-video ${isPlaying ? "rounded-none opacity-0" : "rounded-lg"}
            transition-opacity duration-200`}
            src={thumbnail}
            placeholder='empty'
          />
          <div className='absolute bottom-1 right-1 bg-black bg-opacity-80 text-sm text-white px-0.5 rounded'>
            {formatDuration(duration)}
          </div>
          <video
            ref={videoRef}
            muted
            playsInline
            src={videoUrl}
            className={`w-full h-full object-scale-down absolute inset-0 bg-black
              ${isPlaying ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
          />
          <Progress
            hidden={!isPlaying}
            fill='bg-purple-500'
            value={returnProgressValue(previewProgress, previewMax)}
            className='h-1 absolute bottom-0 bg-gray-600 bg-opacity-60 rounded-none'
          />
        </div>
        <div className='flex flex-row gap-2 py-2'>
          <div className='my-1'>
            <UserAvatar image={ownerImage} />
          </div>
          <div className='flex flex-col gap-0.5 items-start justify-start'>
            <p className='font-medium'>{title}</p>
            <div className='flex flex-col items-start'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={(e: React.MouseEvent) => navigateToChannel(e)} className='text-grayish dark:text-grayish-dark'>
                      {ownerUsername}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side='top' className='bg-gray-500 bg-opacity-90 p-2 border-none text-white'>
                    {ownerUsername}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className='text-grayish dark:text-grayish-dark text-sm'>
                {formatViews(views)} views • {formatCreatedAt(created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;