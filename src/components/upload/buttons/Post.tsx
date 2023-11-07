import React from 'react';

// ui components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';

// constants
import { purpleButtonStyling } from '@/constants/constants';

type PostProps = {
  error: string | null
  callback: () => void
  disabled: boolean
}

const Post = ({ error, callback, disabled }: PostProps) => {

  const handleSubmit = () => {
    if(disabled) return
    callback()
  }
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className={error ? "cursor-default" : "cursor-pointer"}>
          <Button
            className={`px-7 ${purpleButtonStyling}`}
            disabled={error !== null}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </TooltipTrigger>
        {error && <TooltipContent>
          { error }
        </TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default Post;