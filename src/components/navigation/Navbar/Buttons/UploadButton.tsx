import React from 'react';

// icons
import { Upload } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

// helpers
import navigate from '@/helpers/navigate';
import BasicTooltip from '@/components/common/BasicTooltip';

const UploadButton = () => {
  return (
    <BasicTooltip text='Upload' variant="gray">
      <Button className='w-10 h-10 p-0 rounded-full' variant="ghost" onClick={() => navigate("/upload")}>
        <Upload />
      </Button>
    </BasicTooltip>
  );
};

export default UploadButton;