import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { nanoid } from 'nanoid';
import Image from 'next/image';

// storage instance
import { storage } from '@/lib/firebase';

// components
import Loader from "@/components/common/Loader"

type ThumbnailUploaderProps = {
  thumbnailUrl: string | null
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const ThumbnailUploader = ({ thumbnailUrl, setThumbnailUrl }: ThumbnailUploaderProps) => {
  const [uploadingThumbnail,setUploadingThumbnail] = useState(false)
  const containerStyle = "h-1/2 w-full border-2 rounded border-purple-500 flex flex-col items-center justify-center cursor-pointer"

  const uploadThumbnail = async (thumbnail: File) => {
    if(!thumbnail) return
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
      <Image alt='thumbnail prewview' height={300} width={533} className='rounded aspect-video' src={"https://firebasestorage.googleapis.com/v0/b/infinity-da509.appspot.com/o/thumbnails%2F0511f7a4-c4b1-4085-a84c-ad79b6570110?alt=media&token=56f1089a-9662-4b9b-9d89-e0780f9fed66"} />
    </div>
  }
};

export default ThumbnailUploader;