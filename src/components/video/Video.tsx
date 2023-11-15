"use client"
import React, { useEffect } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

// components
import VideoPlayer from './VideoPlayer';

// hooks
import { useCon } from '../context/Context';

type VideoProps = {
  videoId: string
}

const Video = ({ videoId }: VideoProps) => {
  const { setCurrentPage } = useCon()
  const { data: session } = useSession()

  useEffect(() => {
    setCurrentPage("video")
    mutateView()
  }, [])
  
  const fetchVideo = async () => {
    const response = await axios.get(`/api/videos/fetch/${videoId}`)
    return response.data
  }
  
  const { data: video, isLoading } = useQuery({
    queryFn: fetchVideo,
    queryKey: ["video"]
  })

  const viewVideo = async () => {
    if(!session) return
    const response = await axios.post("/api/videos/view", {
      userId: session.user.id,
      videoId
    })
    return response.data
  }

  const { mutate: mutateView } = useMutation({
    mutationFn: viewVideo
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