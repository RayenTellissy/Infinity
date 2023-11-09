import React from 'react';

// ui components
import { Button } from "@/components/ui/button"

// icons
import { ArrowUpFromLine } from "lucide-react"

// constants
import { purpleButtonStyling } from '@/constants/constants';

type SelectFilesProps = {
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadFile: (file: File) => Promise<void>
}

const SelectFiles = ({ fileInputRef, uploadFile }: SelectFilesProps) => {

  const importImage = () => {
    document.getElementById("upload-video-input")?.click()
  }

  return (
    <>
      <div className='p-20 rounded-full bg-[#1e1f1e] hover:cursor-pointer' onClick={importImage}>
        <ArrowUpFromLine size={60} color='white' />
      </div>
      <p>Drag and drop video files to upload</p>
      <Button className={purpleButtonStyling} onClick={importImage}>
        SELECT FILES
      </Button>
      <input
        ref={fileInputRef}
        className='hidden'
        id='upload-video-input'
        type='file'
        accept='video/*'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            uploadFile(e.target.files[0])
          }
        }}
      />
    </>
  );
};

export default SelectFiles;