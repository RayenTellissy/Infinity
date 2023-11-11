import React from 'react';
import { useRouter } from 'next/navigation';

type VideoProps = {
  id: string
  title: string
  thumbnail: string
  duration: number
}

const Video = ({ id, title, thumbnail, duration }: VideoProps) => {
  const router = useRouter()
  
  return (
    <button onClick={() => router.push(`/video/${id}`)}>
      <img className='w-23 h-20' src={thumbnail} />
      <p>{ title }</p>
      <p>{ duration }</p>
    </button>
  );
};

export default Video;