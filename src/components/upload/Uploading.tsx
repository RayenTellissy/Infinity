import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// ui components
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

// components
import TagButton from './TagButton';

// constants
import { videoTags } from '@/constants/constants';

type UploadingProps = {
  uploadProgress: number
}

const Uploading = ({ uploadProgress }: UploadingProps) => {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [chosenTags,setChosenTags] = useState<string[]>([])
  const [allTags,setAllTags] = useState<string[]>(videoTags)
  const [thumbnail,setThumbnail] = useState<string | null>(null)
  const [uploadingThumbnail,setUploadingThumbnail] = useState(false)
  const [visibility,setVisibility] = useState<"public" | "private">("public")
  const { toast } = useToast()
  const router = useRouter()

  const moveToChosen = (tag: string) => {
    if(chosenTags.length >= 3) {
      return toast({
        title: "Can't have more than 3 tags.",
        duration: 2000,
      })
    }
    setAllTags(prevTags => prevTags.filter(e => e !== tag))
    setChosenTags(prevTags => [...prevTags, tag])
  }

  const moveToAll = (tag: string) => {
    setChosenTags(prevTags => prevTags.filter(e => e !== tag))
    setAllTags(prevTags => [...prevTags, tag])
  }

  const canPost = () => {
    return uploadProgress === 100 && thumbnail !== null && title !== "" && chosenTags.length > 0
  }

  const cancelUpload = () => {
    //TODO: to be finished
    router.push("/")
  }

  return (
    <div className='h-screen w-screen'>
      <div className='w-full flex items-center justify-center p-4'>
        <div className='w-1/3 flex flex-col items-center jusify-center gap-3'>
          <p>Uploading your video</p>
          <Progress value={uploadProgress} />
        </div>
      </div>
      <div className='w-full flex flex-row'>
        <div className='flex flex-col p-4 gap-3 w-1/2'>
          <Label htmlFor='upload-video-title'>Title</Label>
          <Input id='upload-video-title' onChange={e => setTitle(e.target.value)} />
          <Label htmlFor='upload-video-description'>Description</Label>
          <Textarea id='upload-video-description' onChange={e => setDescription(e.target.value)} />
          <div className='flex flex-col gap-3'>
            <Label htmlFor='upload-video-tags'>Tags</Label>
            <div id='upload-video-tags' className='flex flex-row flex-wrap gap-3 p-5 rounded bg-[#2b2c2b]'>
              {chosenTags.length !== 0 ? chosenTags.map((e, i) => {
                return <TagButton key={i} text={e} callback={() => moveToAll(e)} isChosen />
              }) : <p className='text-slate-200'>No Tags Chosen.</p>}
            </div>
            <Label htmlFor='upload-video-available-tags'>Available Tags:</Label>
            <div id='upload-video-available-tags' className='flex flex-row flex-wrap gap-3 p-5 rounded bg-[#2b2c2b]'>
              {allTags.length !== 0 && allTags.map((e, i) => {
                return <TagButton key={i} text={e} callback={() => moveToChosen(e)} />
              }) }
            </div>
          </div>
        </div>
        <div className='flex-1'>
          {!thumbnail
          ? <div className='h-1/2 w-full border-2 rounded border-purple-500 flex flex-col items-center justify-center'>
              <p>UPLOAD THUMBNAIL</p>
              <p className='text-slate-300'>You can also drag and drop the image here.</p>
              <input type="file" accept='image/*' />
            </div>
          : <img src={thumbnail} />}
          <div className='p-4 flex flex-col gap-3' id='upload-video-privacy'>
            <Label htmlFor='upload-video-privacy'>Privacy</Label>
            <RadioGroup defaultValue={visibility}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="r1" />
                <Label htmlFor="r1">Public</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="r2" />
                <Label htmlFor="r2">Private</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='flex flex-row justify-end p-4'>
            <Button variant="link" onClick={cancelUpload}>Cancel</Button>
            <Button disabled={!canPost()}>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploading;