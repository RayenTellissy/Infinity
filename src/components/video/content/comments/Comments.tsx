import React, { Key, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// types
import { CommentsType, VideoType } from '@/types/types';

// components
import UserAvatar from '@/components/common/UserAvatar';
import Comment from './Comment';
import ButtonLoader from '@/components/common/ButtonLoader';

// ui components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

// helpers
import navigate from '@/helpers/navigate';

type CommentsProps = {
  comments: CommentsType[]
  videoId: string
}

const Comments = ({ comments, videoId }: CommentsProps) => {
  const { data: session } = useSession()
  const [comment,setComment] = useState("")
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const clearComment = () => {
    setComment("")
  }

  const handleSubmit = async () => {
    if(!session) throw new Error("UNAUTHORIZED")
    if(!comment) throw new Error("MISSING_INFORMATION")
    const response = await axios.post("/api/videos/comments/create", {
      userId: session?.user.id,
      videoId,
      comment
    })
    return response.data
  }

  const { mutate: sendComment, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSettled: () => setComment(""),
    onSuccess: (newComment) => {
      queryClient.setQueryData(["video"], (oldVideo: VideoType) => {
        return {
          ...oldVideo,
          comments: [
            ...oldVideo.comments,
            newComment
          ]
        }
      })
    },
    onError: (error) => {
      if(error.message === "MISSING_INFORMATION") {
        return toast({
          variant: "destructive",
          description: "Required information is missing.",
          duration: 1500
        })
      }
      if(error.message === "UNAUTHORIZED") {
        return toast({
          action: <ToastAction altText='Sign in' onClick={() => navigate("/auth")}>Sign in</ToastAction>,
          description: "You need to be logged in to comment.",
          duration: 2000
        })
      }
      toast({
        variant: "destructive",
        description: "We ran into a problem while creating your comment...",
        duration: 1500
      })
    }
  })

  return (
    <div className='flex flex-col gap-5'>
      <p className='font-bold text-xl'>
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </p>
      {!isPending ? <div className='flex flex-row gap-4 items-center'>
        <div className='h-full flex flex-col justify-start'>
          <UserAvatar image={session?.user.image} />
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <Input placeholder='Add a comment' value={comment} onChange={e => setComment(e.target.value)} />
          {comment && <div className='flex flex-row justify-end gap-2'>
            <Button className='rounded-full' variant="ghost" onClick={clearComment}>Cancel</Button>
            <Button
              onClick={() => sendComment()}
              className='bg-purple-500 dark:hover:bg-purple-400 hover:bg-purple-600 text-white rounded-full'
            >
              Comment
            </Button>
          </div>}
        </div>
      </div> : <div className="w-full flex justify-center">
          <ButtonLoader size={40} color='#A855F7' />
        </div>}
      <div className='flex flex-col gap-3'>
        {comments && comments.map((e: CommentsType, i: Key) => {
          return <Comment
            key={i}
            id={e.id}
            username={e.user.username}
            image={e.user.image}
            comment={e.comment}
            created_at={e.created_at}
          />
        })}
      </div>
    </div>
  );
};

export default Comments;