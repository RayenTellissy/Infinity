"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

// icons
import { Upload } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

// components
import BasicTooltip from '@/components/common/BasicTooltip';

const UploadButton = () => {
  const router = useRouter()

  return (
    <BasicTooltip text='Upload' variant="gray">
      <Button className='w-10 h-10 p-0 rounded-full' variant="ghost" onClick={() => router.push("/upload")}>
        <Upload />
      </Button>
    </BasicTooltip>
  );
};

export default UploadButton;