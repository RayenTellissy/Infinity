import React from 'react';

// helpers
import formatViews from '@/helpers/formatViews';
import formatCreatedAt from '@/helpers/formatCreatedAt';

type DescriptionProps = {
  views: number
  created_at: Date
  description: string
}

const Description = ({ views, created_at, description }: DescriptionProps) => {
  return (
    <div className='p-3 rounded-xl dark:bg-[#272626] dark:hover:bg-[#3f3e3e] bg-[#f2f2f2] hover:bg-[#e5e5e5] cursor-pointer'>
      <div className='flex flex-row items-center gap-1'>
        <p className='font-medium'>{formatViews(views)} views</p>
        •
        <p className='font-medium'>{formatCreatedAt(created_at)}</p>
      </div>
      <p className="font-light">{ description }</p>
    </div>
  );
};

export default Description;