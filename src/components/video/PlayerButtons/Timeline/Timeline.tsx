import React from 'react';

// helpers
import formatDuration from '@/helpers/formatDuration';

// styles
import "./Timeline.css"

type TimelineProps = {
  scrubbingTime: number | null
}

const Timeline = ({ scrubbingTime }: TimelineProps) => {

  return (
    <div id='timeline-container' className='timeline-container'>
      <div className="timeline">
        <div className='timeline-time'>{scrubbingTime && formatDuration(scrubbingTime)}</div>
        <div className="thumb-indicator" />
      </div>
    </div>
  );
};

export default Timeline;