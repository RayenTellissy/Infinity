import React from 'react';

// helpers
import formatDuration from '@/helpers/formatDuration';

type DurationProps = {
  duration: number | null
  currentTime: number | null
}

const Duration = ({ duration, currentTime }: DurationProps) => {
  return (
    <div className='flex flex-row grow gap-1 items-center'>
      {duration && currentTime && <>
        <div>{currentTime && formatDuration(currentTime)}</div>
        /
        <div>{duration && formatDuration(duration)}</div>
      </>}
    </div>
  );
};

export default Duration;