import React from 'react';

// icons
import { X } from 'lucide-react';

const UploadFailed = () => {
  return (
    <div className='flex flex-row gap-3 items-center'>
      <X color='#F91111' />
      <p className='font-bold'>Upload has failed...</p>
    </div>
  );
};

export default UploadFailed;