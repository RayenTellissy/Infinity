import React from 'react';
import { InfinitySpin } from "react-loader-spinner"

const VideoBuffer = () => {
  return <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <InfinitySpin width="200" color='#6200FF'/>
    </div>
};

export default VideoBuffer;