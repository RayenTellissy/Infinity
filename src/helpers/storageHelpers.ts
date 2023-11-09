import { UploadTaskSnapshot } from "firebase/storage"

// function to calculate the uploading progress from an upload task
export const returnProgress = (snapshot: UploadTaskSnapshot) => {
  return (snapshot.bytesTransferred / snapshot.totalBytes) * 100
}