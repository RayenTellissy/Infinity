import React from 'react';

// icons
import { CheckCircle } from 'lucide-react';

const UploadSuccess = () => {
  return (
    <div className='flex flex-row gap-3 items-center'>
      <CheckCircle color='#00DA39' />
      <p className='font-bold'>Video has been uploaded successfully!</p>
    </div>
  );
};

export default UploadSuccess;