"use client"
import React from 'react';
import { storage, app } from '@/lib/firebase';

// ui components
import { Button } from "@/components/ui/button"

// icons
import { ArrowUpFromLine } from "lucide-react"

const Upload = () => {
  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
      <div className='p-20 rounded-full bg-[#1e1f1e]'>
        <ArrowUpFromLine size={60} />
      </div>
      <p>Drag and drop video files to upload</p>
      <Button onClick={() => document.getElementById("upload-video-input")?.click()}>SELECT FILES</Button>
      <input className='hidden' id='upload-video-input' type='file' />
    </div>
  );
};

export default Upload;