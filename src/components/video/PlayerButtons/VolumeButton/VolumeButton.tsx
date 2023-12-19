import React from 'react';

// icons
import { VolumeX, Volume, Volume1, Volume2 } from 'lucide-react';

// components
import VolumeSlider from './VolumeSlider/VolumeSlider';

type VolumeButtonProps = {
  volume: number
  volumeState: "muted" | "low" | "medium" | "high"
  toggleMute: () => void
  changeVolume: (volume: number) => void
  buttonHoverEffect: string
}

const VolumeButton = ({ volume, volumeState, toggleMute, changeVolume, buttonHoverEffect }: VolumeButtonProps) => {

  const volumeDisplay = {
    muted: <VolumeX className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' />,
    low: <Volume className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' />,
    medium: <Volume1 className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' />,
    high: <Volume2 className='w-[25px] h-[25px] md:w-[40px] md:h-[40px]' />
  }

  return (
    <div id='video-player-volume-container' className={`flex flex-row items-center gap-2 ${buttonHoverEffect}`}>
      <button onClick={toggleMute}>
        {volumeDisplay[volumeState]}
      </button>
      <VolumeSlider volume={volume} changeVolume={changeVolume} />
    </div>
  );
};

export default VolumeButton;