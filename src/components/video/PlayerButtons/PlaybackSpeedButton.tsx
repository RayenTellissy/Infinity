import React from 'react';

type PlaybackSpeedButtonProps = {
  changePlaybackSpeed: () => void
  playbackSpeed: number | undefined
}

const PlaybackSpeedButton = ({ changePlaybackSpeed, playbackSpeed }: PlaybackSpeedButtonProps) => {
  return (
    <button className='text-2xl font-bold text-[20px] md:text-[30px]' onClick={changePlaybackSpeed}>
      x{playbackSpeed && playbackSpeed}
    </button>
  );
};

export default PlaybackSpeedButton;