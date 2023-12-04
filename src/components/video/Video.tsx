"use client"
import React, { useEffect } from 'react';
import axios from "axios"
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

// components
import VideoPlayer from './VideoPlayer';
import Title from './content/Title';
import MiddleRow from './content/MiddleRow';
import SideVideos from './content/SideVideos';
import VideoError from './content/VideoError';
import Comments from './content/comments/Comments';

  type VideoProps = {
  videoId: string
}

const Video = ({ videoId }: VideoProps) => {
  const { data: session } = useSession()

  useEffect(() => {
    mutateView()
  }, [])
  
  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/videos/fetch/${videoId}`)
      return response.data
    }
    catch(error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.data === "NOEXIST") {
          throw new Error("NOEXIST")
        }
      }
    }
  }
  
  const { data: video, isLoading, error } = useQuery({
    queryFn: fetchVideo,
    queryKey: ["video"],
    gcTime: 0,
    retry: false
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

  if(error) {
    return <VideoError />
  }

  return (
    <div className='flex-1 flex flex-row'>
      <div className='w-full max-w-[70%] flex flex-col p-2 gap-3'>
        <VideoPlayer videoUrl={video.url}/>
        <Title title={video.title} />
        <MiddleRow
          userId={video.owner.id}
          userUsername={video.owner.username}
          userImage={video.owner.image}
          subscribers={video.subscribers}
          likes={video.likes}
          dislikes={video.dislikes}
          videoId={video.id}
          views={video.views}
          created_at={video.created_at}
          description={video.description}
          comments={video.comments}
        />
        <Comments videoId={video.id} />
      </div>
      <div className='flex justify-start'>
        <SideVideos />
      </div>
    </div>
  );
};

export default Video;