"use client"
import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// components
import VideoPlayer from './VideoPlayer';

// hooks
import { useCon } from '../context/Context';

type VideoProps = {
  videoId: string
}

const Video = ({ videoId }: VideoProps) => {
  const { setCurrentPage } = useCon()

  useEffect(() => {
    setCurrentPage("video")
  }, [])
  
  const fetchVideo = async () => {
    const response = await axios.get(`/api/videos/fetch/${videoId}`)
    return response.data
  }
  
  const { data: video, isLoading } = useQuery({
    queryFn: fetchVideo,
    queryKey: ["video"]
  })

  if(isLoading) {
    return <div>Loading video...</div>
  }

  return (
    <div className='flex-1'>
      <VideoPlayer videoUrl={video.url}/>
    </div>
  );
};

export default Video;