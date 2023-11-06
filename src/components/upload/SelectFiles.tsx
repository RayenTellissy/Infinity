import React from 'react';

// ui components
import { Button } from "@/components/ui/button"

// icons
import { ArrowUpFromLine } from "lucide-react"

type SelectFilesProps = {
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadFile: (file: File) => Promise<void>
}

const SelectFiles = ({ fileInputRef, uploadFile }: SelectFilesProps) => {
  return (
    <>
      <div className='p-20 rounded-full bg-[#1e1f1e]'>
        <ArrowUpFromLine size={60} />
      </div>
      <p>Drag and drop video files to upload</p>
      <Button onClick={() => document.getElementById("upload-video-input")?.click()}>SELECT FILES</Button>
      <input
        ref={fileInputRef}
        className='hidden'
        id='upload-video-input'
        type='file'
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