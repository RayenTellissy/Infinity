"use client"
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// components
import UserAvatar from '@/components/common/UserAvatar';
import formatCreatedAt from '@/helpers/formatCreatedAt';

// ui components
import { Button } from '@/components/ui/button';

// icons
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type CommentProps = {
  id: string // comment id
  username: string
  image: string
  comment: string
  created_at: Date
  likes: number
  dislikes: number
}

const Comment = ({ id, username, image, comment, created_at, likes, dislikes }: CommentProps) => {

  const handleInteraction = () => {
    
  }

  return (
    <div className='flex flex-row gap-3'>
      <Link className='flex flex-col' href={`/channel/${username}`}>
        <UserAvatar image={image} />
      </Link>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-2 items-center'>
          <Link href={`/channel/${username}`} className='font-bold'>{username}</Link>
          <p className='text-sm text-grayish'>{formatCreatedAt(created_at)}</p>
        </div>
        <p>{ comment }</p>
        <div className='flex flex-row items-center gap-3'>
          <div className='flex flex-row items-center'>
            <Button variant="ghost" className='w-10 h-10 rounded-full p-0'>
              <ThumbsUp />
            </Button>
            <p>{ likes }</p>
          </div>
          <div className='flex flex-row items-center'>
            <Button variant="ghost" className='w-10 h-10 rounded-full p-0'>
              <ThumbsDown />
            </Button>
            <p>{ dislikes }</p>
          </div>
          <Button variant="ghost" className='rounded-3xl'>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;