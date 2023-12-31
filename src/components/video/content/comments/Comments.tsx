"use client"
import React, { Key, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// types
import { CommentsType } from '@/types/types';

// components
import UserAvatar from '@/components/common/UserAvatar';
import Comment from './Comment';
import ButtonLoader from '@/components/common/ButtonLoader';

// ui components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

type CommentsProps = {
  videoId: string
}

const Comments = ({ videoId }: CommentsProps) => {
  const { data: session } = useSession()
  const [comment,setComment] = useState("")
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const fetchComments = async () => {
    const response = await axios.get(`/api/videos/comments/fetch/${videoId}`)
    return response.data
  }
  
  const { data: comments, isLoading } = useQuery({
    queryFn: fetchComments,
    queryKey: ["videoComments"]
  })

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
      queryClient.setQueryData(["videoComments"], (oldComments: CommentsType[]) => {
        return [...oldComments, newComment]
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
          action: <ToastAction altText='Sign in' onClick={() => router.push("/auth")}>Sign in</ToastAction>,
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

  const countInteractions = (interactions: { type: "like" | "dislike" }[], type: "like" | "dislike") => {
    if(!interactions.length) return 0
    var count = 0
    for(var i = 0; i < interactions.length; i++) {
      if(interactions[i].type === type) count++
    }
    return count
  }

  if(isLoading) {
    return <div className="w-full flex justify-center">
      <ButtonLoader size={40} color='#A855F7' />
    </div>
  }

  return (
    <div className='flex flex-col gap-5 mt-2'>
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
            likes={countInteractions(e.CommentInteractions, "like")}
            dislikes={countInteractions(e.CommentInteractions, "dislike")}
          />
        })}
      </div>
    </div>
  );
};

export default Comments;