import React from 'react';
import Link from 'next/link';

// icons
import { Upload } from 'lucide-react';

// components
import BasicTooltip from '@/components/common/BasicTooltip';

const UploadButton = () => {

  return (
    <BasicTooltip text='Upload' variant="gray">
      <Link
        href="/upload"
        className='h-10 w-10 flex flex-row items-center justify-center gap-3 rounded-full hover:bg-accent py-2 px-4'
        aria-label='upload video'
      >
        <div>
          <Upload />
        </div>
      </Link>
    </BasicTooltip>
  );
};

export default UploadButton;