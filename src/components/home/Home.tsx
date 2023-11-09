"use client"
import React, { Key, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useCon } from "@/components/context/Context"

// ui components
import { ModeToggle } from "@/components/ui/theme-toggle"

// components
import Video from "@/components/common/Video"

// types
import { VideoType } from '@/types/types';

const Home = () => {
  const { setCurrentPage } = useCon()

  useEffect(() => {
    setCurrentPage("Home")
  }, [])

  const fetchVideos = async () => {
    const response = await axios.get("/api/videos/fetch", {
      withCredentials: true
    })
    return response.data
  }

  const { data: videos, isLoading } = useQuery({
    queryFn: fetchVideos,
    queryKey: ["videos"],
  })

  if (isLoading) {
    return <div>Loading videos...</div>
  }

  return (
    <div className='h-full'>
      <ModeToggle />
      {videos.length !== 0 && videos.map((e: VideoType, i: Key) => {
        return <Video id={e.id} title={e.title} thumbnail={e.thumbnail} duration={e.duration} />
      })}
    </div>
  );
};

export default Home;