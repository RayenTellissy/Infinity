import React from 'react';

// components
import Miniplayer from '@/assets/icons/Miniplayer';

type MiniplayerButtonProps = {
  buttonHoverEffect: string
  toggleMiniPlayer: () => void
  inMini: boolean
}

const MiniplayerButton = ({ buttonHoverEffect, toggleMiniPlayer, inMini }: MiniplayerButtonProps) => {
  return (
    <button className={buttonHoverEffect} onClick={toggleMiniPlayer}>
      <Miniplayer inMini={inMini} />
    </button>
  );
};

export default MiniplayerButton;