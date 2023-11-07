import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid';

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
    const storageRef = ref(storage, `thumbnails/${v4()}`)
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
      <img className='h-[300px] w-[533px] rounded' src={thumbnailUrl} />
    </div>
  }
};

export default ThumbnailUploader;