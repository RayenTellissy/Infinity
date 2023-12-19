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
      {isFullscreen
        ? <Minimize className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />
        : <Maximize className='w-[30px] h-[30px] md:w-[50px] md:h-[50px]' />}
    </button>
  );
};

export default FullscreenButton;