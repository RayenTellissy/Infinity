import React from 'react';
import { PackageSearch } from 'lucide-react';

const VideoError = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center m-28'>
      <PackageSearch size={250} />
      <p className='font-bold text-xl'>Video Doesn't exist!</p>
    </div>
  );
};

export default VideoError;