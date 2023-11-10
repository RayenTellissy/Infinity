import React from 'react';

// icons
import { VolumeX, Volume, Volume1, Volume2 } from 'lucide-react';

// components
import VolumeSlider from './VolumeSlider/VolumeSlider';

type VolumeButtonProps = {
  volumeState: "muted" | "low" | "medium" | "high"
  toggleMute: () => void
  changeVolume: (volume: number) => void
  buttonHoverEffect: string
}

const VolumeButton = ({ volumeState, toggleMute, changeVolume, buttonHoverEffect }: VolumeButtonProps) => {

  const volumeDisplay = {
    muted: <VolumeX size={40} />,
    low: <Volume size={40} />,
    medium: <Volume1 size={40} />,
    high: <Volume2 size={40} />
  }

  return (
    <div id='video-player-volume-container' className={`flex flex-row items-center gap-2 ${buttonHoverEffect}`}>
      <button onClick={toggleMute}>
        {volumeDisplay[volumeState]}
      </button>
      <VolumeSlider changeVolume={changeVolume} />
    </div>
  );
};

export default VolumeButton;