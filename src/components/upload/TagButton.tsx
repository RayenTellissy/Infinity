import React from 'react';

// icons
import { X } from "lucide-react"

// ui components
import { Button } from "@/components/ui/button"

type TagButtonProps = {
  text: string
  callback: () => void
  isChosen?: boolean
}

const TagButton = ({ text, callback, isChosen = false }: TagButtonProps) => {
  return <Button className="flex flex-row gap-2" onClick={callback}>
    {text}
    {isChosen && <X className='p-1' />}
  </Button>
};

export default TagButton;