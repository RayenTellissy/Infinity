"use client"
import React, { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid';

// components
import SelectFiles from "@/components/upload/SelectFiles"
import Uploading from "@/components/upload/Uploading"

// storage instance
import { storage } from '@/lib/firebase';

// helpers
import { returnProgress } from '@/helpers/storageHelpers';
import returnVideoDuration from '@/helpers/returnVideoDuration';

// constants
import { videoMaxSize } from '@/constants/constants';

// ui components
import { useToast } from "@/components/ui/use-toast"

const Upload = () => {
  const [uploadProgress,setUploadProgress] = useState(0)
  const [videoDuration,setVideoDuration] = useState<number | null>(null)
  const [screen,setScreen] = useState<"uploading" | "select">("select")
  const [finishedUploading,setFinishedUploading] = useState(false)
  const [videoUrl,setVideoUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()

  const uploadFile = async (file: File) => {
    if (!file) return

    // checking for file size
    if(file.size > videoMaxSize) {
      toast({
        title: "Your file has exceeded the max file size cap (100mb)",
        variant: "destructive",
        duration: 3000
      })
      return clearInput()
    }

    returnVideoDuration(file, (duration: number) => {
      setVideoDuration(duration)
    })
    setScreen("uploading")

    const storageRef = ref(storage, `videos/${nanoid()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      setUploadProgress(returnProgress(snapshot))
    },
    // catch upload task errors
    (error) => console.log(error),
    // on success callback
    async () => {
      const url = await getDownloadURL(storageRef)
      setVideoUrl(url)
      setFinishedUploading(true)
      clearInput()
    })
  }
  
  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const displays = {
    uploading: <Uploading
      uploadProgress={uploadProgress}
      finishedUploading={finishedUploading}
      videoDuration={videoDuration}
      videoUrl={videoUrl}
    />,
    select: <SelectFiles fileInputRef={fileInputRef} uploadFile={uploadFile} />
  }
  
  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
      {displays[screen]}
    </div>
  );
};

export default Upload;