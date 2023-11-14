import React from 'react';
import Image from "next/image"
import { useRouter } from 'next/navigation';

// helpers
import formatDuration from '@/helpers/formatDuration';
import VideoDuration from './VideoDuration';

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
      <div className='relative'>
        <Image
          alt='video thumbnail'
          height={152}
          width={270}
          className='aspect-video rounded-lg block w-full h-full object-cover'
          src={thumbnail}
        />
        <VideoDuration duration={duration} style='absolute right-2 bottom-2' />
      </div>
      <p>{ title }</p>
    </button>
  );
};

export default Video;