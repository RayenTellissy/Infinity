import React from 'react';

// icons
import { Play, Pause } from "lucide-react"

type PlayButtonProps = {
  isPlaying: boolean
  togglePlay: () => void
  buttonHoverEffect: string
}

const PlayButton = ({ isPlaying, togglePlay, buttonHoverEffect }: PlayButtonProps) => {
  return (
    <button id='video-play-button' className={`flex flex-row ${buttonHoverEffect}`} onClick={togglePlay}>
      {!isPlaying ? <Play className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' fill="white" />
        : <Pause className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' fill='white' />}
    </button>
  );
};

export default PlayButton;