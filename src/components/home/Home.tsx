"use client"
import React, { Key, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useCon } from "@/components/context/Context"

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
    try {
      const response = await axios.get("/api/videos/fetchAll", {
        withCredentials: true
      })
      return response.data
    }
    catch(error) {
      console.log(error)
    }
  }

  const { data: videos, isLoading } = useQuery({
    queryFn: fetchVideos,
    queryKey: ["videos"]
  })

  if (isLoading) {
    return <div>Loading videos...</div>
  }

  return (
    <div className='h-full'>
      {videos && videos.length !== 0 && videos.map((e: VideoType, i: Key) => {
        return <Video key={i} id={e.id} title={e.title} thumbnail={e.thumbnail} duration={e.duration} />
      })}
    </div>
  );
};

export default Home;