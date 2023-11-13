import React from 'react';

// ui components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';

// components
import ButtonLoader from '@/components/common/ButtonLoader';

// constants
import { purpleButtonStyling } from '@/constants/constants';

type PostProps = {
  error: string | null
  callback: () => void
  disabled: boolean
  isPending: boolean
}

const Post = ({ error, callback, disabled, isPending }: PostProps) => {

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
            {isPending ? <ButtonLoader /> : "Post"}
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