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
    <button className={`flex flex-row ${buttonHoverEffect}`} onClick={togglePlay}>
      {!isPlaying ? <Play fill="white" size={40} />
        : <Pause fill='white' size={40} />}
    </button>
  );
};

export default PlayButton;