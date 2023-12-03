"use client"
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

// ui components
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// components
import UserAvatar from '@/components/common/UserAvatar';
import AvatarUploadButton from './AvatarUploadButton';

// constants
import { avatarMaxSize } from '@/constants/constants';

const AvatarSection = () => {
  const [newImage,setNewImage] = useState<string | null>(null)
  const [file,setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()
  const { data: session, status } = useSession()

  const importImage = (file: File) => {
    if(!file) return

    if(file.size > avatarMaxSize) {
      toast({
        title: "Your file has exceeded the max file size cap (1mb)",
        variant: "destructive",
        duration: 3000
      })
      return clearInput()
    }

    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
      setFile(null)
    }
  }

  if(status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className='px-20 py-10 flex flex-row items-center gap-5'>
      <UserAvatar size={100} image={newImage ? newImage : session?.user.image} />
      <AvatarUploadButton file={file} awaitingUpload={!!newImage} clearInput={clearInput} />
      <input
        className='hidden'
        id='import-avatar-settings-input'
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if(e.target.files) {
            importImage(e.target.files[0])
          }
        }}
      />
    </div>
  );
};

export default AvatarSection;