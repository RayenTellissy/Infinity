import React, { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { nanoid } from 'nanoid';
import Image from 'next/image';

// storage instance
import { storage } from '@/lib/firebase';

// components
import Loader from "@/components/common/Loader"

// ui components
import { useToast } from '@/components/ui/use-toast';

// constants
import { thumbnailMaxSize } from '@/constants/constants';

type ThumbnailUploaderProps = {
  thumbnailUrl: string | null
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const ThumbnailUploader = ({ thumbnailUrl, setThumbnailUrl }: ThumbnailUploaderProps) => {
  const [uploadingThumbnail,setUploadingThumbnail] = useState(false)
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerStyle = "h-1/2 w-full border-2 rounded border-purple-500 flex flex-col items-center justify-center cursor-pointer"

  const uploadThumbnail = async (thumbnail: File) => {
    if(!thumbnail) return

    // checking for file size
    if(thumbnail.size > thumbnailMaxSize) {
      toast({
        title: "Your thumbnail has exceeded the max image size cap (1mb)",
        variant: "destructive",
        duration: 3000
      })
      return clearInput()
    }

    setUploadingThumbnail(true)
    const storageRef = ref(storage, `thumbnails/${nanoid()}`)
    await uploadBytes(storageRef, thumbnail)

    const url = await getDownloadURL(storageRef)
    setThumbnailUrl(url)
    setUploadingThumbnail(false)
  }

  const importThumbnail = () => {
    document.getElementById("upload-video-thumbnail-input")?.click()
  }

  const clearInput = () => {
    if(inputRef.current) {
      inputRef.current.value = ""
    }
  }

  if(uploadingThumbnail) {
    return <div className={containerStyle}>
      <Loader />
    </div>
  }

  if(!thumbnailUrl) {
    return <div
      className={containerStyle}
      onClick={importThumbnail}
    >
      <p>UPLOAD THUMBNAIL</p>
      <p className='text-slate-300'>You can also drag and drop the image here.</p>
      <input
        ref={inputRef}
        className='hidden'
        id='upload-video-thumbnail-input'
        type="file"
        accept='image/*'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if(e.target.files) {
            uploadThumbnail(e.target.files[0])
          }
        }}
      />
    </div>
  }

  if(thumbnailUrl) {
    return <div className='h-1/2 flex items-center justify-center'>
      <Image alt='thumbnail prewview' height={300} width={533} className='rounded aspect-video' src={thumbnailUrl} />
    </div>
  }
};

export default ThumbnailUploader;