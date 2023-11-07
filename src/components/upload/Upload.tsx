"use client"
import React, { useRef, useState } from 'react';
import { v4 } from "uuid"
import { ref, uploadBytesResumable } from 'firebase/storage';

// components
import SelectFiles from "@/components/upload/SelectFiles"
import Uploading from "@/components/upload/Uploading"

// storage instance
import { storage } from '@/lib/firebase';

// helpers
import { isFinished, returnProgress } from '@/helpers/storageHelpers';
import returnVideoDuration from '@/helpers/returnVideoDuration';

const Upload = () => {
  const [uploadProgress,setUploadProgress] = useState(0)
  const [videoDuration,setVideoDuration] = useState<number | null>(null)
  const [screen,setScreen] = useState<"uploading" | "select">("select")
  const [finishedUploading,setFinishedUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const uploadFile = async (file: File) => {
    if (!file) return
    returnVideoDuration(file, (duration: number) => {
      setVideoDuration(duration)
    })
    setScreen("uploading")
    const storageRef = ref(storage, `videos/${v4()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on("state_changed", (snapshot) => {
      setUploadProgress(returnProgress(snapshot))
      if(isFinished(snapshot)) {
        setFinishedUploading(true)
        clearInput()
      }
    })
  }
  
  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const displays = {
    uploading: <Uploading uploadProgress={uploadProgress} finishedUploading={finishedUploading} videoDuration={videoDuration} />,
    select: <SelectFiles fileInputRef={fileInputRef} uploadFile={uploadFile} />
  }
  
  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
      {displays[screen]}
    </div>
  );
};

export default Upload;