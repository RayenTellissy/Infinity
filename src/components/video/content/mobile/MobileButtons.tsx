import React from 'react';
import { useTheme } from 'next-themes';

// components
import BasicTooltip from '@/components/common/BasicTooltip';
import InteractionSkeleton from '../../skeletons/InteractionSkeleton';

// ui components
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// icons
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type MobileButtonsProps = {
  interaction: string | undefined
  likes: number
  dislikes: number
  mutateInteraction: (arg: "like" | "dislike") => void
}

const MobileButtons = ({ interaction, likes, dislikes, mutateInteraction }: MobileButtonsProps) => {
  const { theme } = useTheme()

  return (
    <div className='flex flex-row gap-2 md:hidden'>
      <div className='flex flex-row'>
        {interaction ? <>
          <BasicTooltip
            text={interaction === "liked" ? "Unlike" : 'I like this'}
            styling='bg-gray-500 bg-opacity-90 p-2 border-none text-white mb-3'
            delay={200}
          >
            <button
              onClick={() => mutateInteraction("like")}
              className='dark:hover:bg-[#3f3e3e] dark:bg-[#262726] bg-[#f2f3f3] hover:bg-[#e5e5e5] px-3 py-0 md:px-7 md:py-2 rounded-l-3xl
                    flex flex-row items-center gap-2'
            >
              <ThumbsUp className='w-[20px] h-[20px] md:w-[35px] md:h-[35px]' fill={interaction === "liked" ? (theme === "dark" ? "white" : "black") : "none"} />
              <p>{likes}</p>
            </button>
          </BasicTooltip>
          <Separator orientation='vertical' />
          <BasicTooltip
            text={interaction === "disliked" ? "Remove dislike" : 'I dislike this'}
            styling='bg-gray-500 bg-opacity-90 p-2 border-none text-white mb-3'
            delay={200}
          >
            <button
              onClick={() => mutateInteraction("dislike")}
              className='dark:hover:bg-[#3f3e3e] dark:bg-[#262726] bg-[#f2f3f3] hover:bg-[#e5e5e5] px-3 py-0 md:px-7 md:py-2  rounded-e-3xl
                    flex flex-row items-center gap-2'
            >
              <p>{dislikes}</p>
              <ThumbsDown className='w-[20px] h-[20px] md:w-[35px] md:h-[35px]' fill={interaction === "disliked" ? (theme === "dark" ? "white" : "black") : "none"} />
            </button>
          </BasicTooltip>
        </> : <InteractionSkeleton />}
      </div>
      <Button className='rounded-3xl dark:hover:bg-[#3f3e3e] dark:bg-[#262726] bg-[#f2f3f3] hover:bg-[#e5e5e5] text-white'>Share</Button>
    </div>
  );
};

export default MobileButtons;