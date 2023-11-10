import React from 'react';

type PlaybackSpeedButtonProps = {
  changePlaybackSpeed: () => void
  playbackSpeed: number | undefined
}

const PlaybackSpeedButton = ({ changePlaybackSpeed, playbackSpeed }: PlaybackSpeedButtonProps) => {
  return (
    <button className='text-2xl font-bold' onClick={changePlaybackSpeed}>
      x{playbackSpeed && playbackSpeed}
    </button>
  );
};

export default PlaybackSpeedButton;