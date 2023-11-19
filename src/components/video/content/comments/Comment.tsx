import React from 'react';

// components
import UserAvatar from '@/components/common/UserAvatar';
import formatCreatedAt from '@/helpers/formatCreatedAt';

type CommentProps = {
  id: string // comment id
  username: string
  image: string
  comment: string
  created_at: Date
}

const Comment = ({ id, username, image, comment, created_at }: CommentProps) => {
  return (
    <div className='flex flex-row gap-3'>
      <div>
        <UserAvatar image={image} />
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-2 items-center'>
          <p className='font-bold'>{ username }</p>
          <p className='text-sm text-grayish'>{formatCreatedAt(created_at)}</p>
        </div>
        <p>{ comment }</p>
      </div>
    </div>
  );
};

export default Comment;