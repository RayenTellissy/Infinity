import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { useSession } from 'next-auth/react';

// ui components
import { Button } from '@/components/ui/button';

// components
import ButtonLoader from '@/components/common/ButtonLoader';

// ui components
import { useToast } from '@/components/ui/use-toast';

// storage instance
import { storage } from '@/lib/firebase';

type AvatarUploadButton = {
  awaitingUpload: boolean
  file: File | null
  clearInput: () => void
}

const AvatarUploadButton = ({ awaitingUpload, file, clearInput }: AvatarUploadButton) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, update } = useSession()
  const { toast } = useToast()

  const clickInput = () => {
    document.getElementById("import-avatar-settings-input")?.click()
  }

  const uploadImage = async () => {
    if (!file) return

    const storageRef = ref(storage, `profile_pictures/${nanoid()}`)

    setIsLoading(true)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    try {
      await axios.post("/api/user/changeAvatar", {
        id: session?.user.id,
        image: url
      })
    }
    catch(error) {
      console.log(error)
    }
    setIsLoading(false)
    await update({ image: url })
    toast({
      title: "Image Uploaded",
      duration: 1500
    })

    clearInput()
  }

  return (
    <>
      {awaitingUpload
        ? <Button onClick={uploadImage}>{isLoading ? <ButtonLoader /> : "Upload Image"}</Button>
        : <Button onClick={clickInput}>Change Avatar</Button>
      }
    </>
  );
};

export default AvatarUploadButton;