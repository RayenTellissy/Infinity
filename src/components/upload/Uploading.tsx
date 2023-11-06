import React, { useState } from 'react';

// ui components
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// components
import TagButton from './TagButton';

// constants
import { videoTags } from '@/constants/constants';

type UploadingProps = {
  uploadProgress: number
}

const Uploading = ({ uploadProgress }: UploadingProps) => {
  const [chosenTags,setChosenTags] = useState<string[]>([])
  const [allTags,setAllTags] = useState<string[]>(videoTags)

  const moveToChosen = (tag: string) => {
    allTags.filter(e => e !== tag)
    chosenTags.push(tag)
  }

  const moveToAll = (tag: string) => {
    chosenTags.filter(e => e !== tag)
    allTags.push(tag)
  }

  return (
    <div className='h-screen w-screen'>
      <div className='flex flex-col p-4 gap-3 w-1/2'>
        <Label htmlFor='upload-video-title'>Title</Label>
        <Input id='upload-video-title' />
        <Label htmlFor='upload-video-description'>Description</Label>
        <Textarea id='upload-video-description' />
        <div className='flex flex-col gap-3'>
          <Label htmlFor='upload-video-tags'>Tags</Label>
          <div id='upload-video-tags' className='p-5 rounded bg-[#2b2c2b]'>
            {chosenTags.length !== 0 ? chosenTags.map((e, i) => {
              return <TagButton key={i} text={e} callback={moveToAll} />
            }) : <p className='text-slate-200'>No Tags Chosen.</p>}
          </div>
          <Label htmlFor='upload-video-available-tags'>Available Tags:</Label>
          <div id='upload-video-available-tags' className='flex flex-row flex-wrap gap-3 p-5 rounded bg-[#2b2c2b]'>
            {allTags.length !== 0 && allTags.map((e, i) => {
              return <TagButton key={i} text={e} callback={moveToChosen} />
            }) }
          </div>
        </div>
      </div>
      <Progress value={uploadProgress} />
    </div>
  );
};

export default Uploading;