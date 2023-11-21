import React from 'react';

// icons
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

type ToastContentProps = {
  title: string
  status: "liked" | "disliked" | "none"
}

const ToastContent = ({ title, status }: ToastContentProps) => {
  const displays = {
    liked: <ThumbsUp />,
    disliked: <ThumbsDown />,
    none: <X className='p-0 m-0' />
  }

  return (
    <div className='w-full flex flex-row gap-3 items-center'>
      { displays[status] }
      { title }
    </div>
  );
};

export default ToastContent;