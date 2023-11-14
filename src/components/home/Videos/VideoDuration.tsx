import React from 'react';

// helpers
import formatDuration from '@/helpers/formatDuration';

type VideoDurationProps = {
  duration: number
  style?: string
}

const VideoDuration = ({ duration, style }: VideoDurationProps) => {
  return <p className={`px-1 bg-black bg-opacity-80 rounded ${style}`}>{ formatDuration(duration) }</p>
};

export default VideoDuration;