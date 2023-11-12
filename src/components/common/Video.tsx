import React from 'react';
import Image from "next/image"
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
      <Image alt='video thumbnail' height={100} width={170} src={thumbnail} />
      <p>{ title }</p>
      <p>{ duration }</p>
    </button>
  );
};

export default Video;