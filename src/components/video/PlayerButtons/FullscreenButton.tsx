import React from 'react';

// icons
import { Maximize, Minimize } from 'lucide-react';

type FullscreenButtonProps = {
  isFullscreen: boolean
  toggleFullscreen: () => void
  buttonHoverEffect: string
}

const FullscreenButton = ({ isFullscreen, toggleFullscreen, buttonHoverEffect }: FullscreenButtonProps) => {
  return (
    <button className={buttonHoverEffect} onClick={toggleFullscreen}>
      {isFullscreen ? <Minimize size={40} /> : <Maximize size={40} />}
    </button>
  );
};

export default FullscreenButton;