"use client"
import React, { useRef, useState } from 'react';
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// components
import SelectFiles from "@/components/upload/SelectFiles"
import Uploading from "@/components/upload/Uploading"

// storage instance
import { storage } from '@/lib/firebase';

const Upload = () => {
  const [uploadProgress,setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const uploadFile = async (file: File) => {
    if (!file) return
    setIsUploading(true)
    const storageRef = ref(storage, `profile_pictures/${v4()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setUploadProgress(progress)
      console.log(progress)
    })

    clearInput()
  }

  const clearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center gap-3'>
      {isUploading
        ? <SelectFiles fileInputRef={fileInputRef} uploadFile={uploadFile} />
        : <Uploading uploadProgress={uploadProgress} />
      }
    </div>
  );
};

export default Upload;