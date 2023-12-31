"use client"
import React, { Key } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// components
import Video from './Video';

// types
import { HomeVideo } from '@/types/types';

const Home = () => {

  const fetchVideos = async () => {
    try {
      const response = await axios.get("/api/videos/fetch")
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
    <div className='flex-1 w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-0 md:p-6'>
      {videos && videos.length !== 0 && videos.map((e: HomeVideo, i: Key) => {
        return <Video
          key={i}
          id={e.id}
          title={e.title}
          thumbnail={e.thumbnail}
          duration={e.duration}
          videoUrl={e.url}
          ownerUsername={e.owner.username as string}
          ownerImage={e.owner.image as string}
          views={e.views.length}
          created_at={e.created_at}
        />
      })}
    </div>
  );
};

export default Home;