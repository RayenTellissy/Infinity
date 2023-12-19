"use client"
import React, { useCallback } from 'react';
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

// ui components
import { Button } from "@/components/ui/button"
import { useToast } from '../ui/use-toast';

// icons
import { ArrowUpFromLine, FileUp } from "lucide-react"

// constants
import { purpleButtonStyling } from '@/constants/constants';

type SelectFilesProps = {
  fileInputRef: React.RefObject<HTMLInputElement>
  uploadFile: (file: File) => Promise<void>
}

const SelectFiles = ({ fileInputRef, uploadFile }: SelectFilesProps) => {
  const { toast } = useToast()

  const onDrop = useCallback((files: File[]) => {
    uploadFile(files[0])
  }, [])
  
  const onDragRejected = () => {
    toast({ variant: "destructive", title: "You can only upload videos.", duration: 2000 })
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {
    "video/mp4": []
  }, maxFiles: 1, onDropRejected: onDragRejected })

  
  return (
    <div {...getRootProps()} className='flex flex-col gap-3 h-full w-full items-center justify-center'>
      <div className='p-20 rounded-full bg-[#1e1f1e] hover:cursor-pointer'>
        {isDragActive ? <FileUp size={60} color='white' /> : <ArrowUpFromLine size={60} color='white' />}
      </div>
      <p>Drag and drop video files to upload</p>
      <Button className={purpleButtonStyling}>
        SELECT FILES
      </Button>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        {...getInputProps()}
      />
    </div>
  );
};

export default SelectFiles;