"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTheme } from 'next-themes';

// components
import UserAvatar from '@/components/common/UserAvatar';
import SubscribeSkeleton from '../skeletons/SubscribeSkeleton';
import InteractionModal from './modals/InteractionModal';
import SubscribeModal from './modals/SubscribeModal';
import InteractionSkeleton from '../skeletons/InteractionSkeleton';
import BasicTooltip from '@/components/common/BasicTooltip';
import Description from './Description';
import ToastContent from './toasts/ToastContent';

// ui components
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { useToast } from '@/components/ui/use-toast';

// types
import { VideoType, CommentsType } from '@/types/types';

// icons
import { ThumbsUp, ThumbsDown } from 'lucide-react';

type MiddleRowProps = {
  userId: string
  userUsername: string
  userImage: string | null
  subscribers: number
  likes: number
  dislikes: number
  videoId: string
  views: number
  created_at: Date
  description: string
  comments: CommentsType[]
}

const MiddleRow = ({
  userId,
  userUsername,
  userImage,
  subscribers,
  likes,
  dislikes,
  videoId,
  views,
  created_at,
  description
}: MiddleRowProps) => {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [interactionModalOpen, setInteractionModalOpen] = useState(false)
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false)

  const subscribe = async () => {
    if (!session) return setSubscribeModalOpen(true)
    if (!isSubscribed) {
      const response = await axios.post("/api/channels/subscribe", {
        subscriberId: session?.user.id,
        subscribedId: userId
      })
      return response.data
    }
    else {
      const response = await axios.post("/api/channels/unsubscribe", {
        subscriberId: session?.user.id,
        subscribedId: userId
      })
      return response.data
    }
  }

  const { mutate: mutateSubscribe } = useMutation({
    mutationFn: subscribe,
    onMutate: () => {
      if (!session) return
      queryClient.setQueryData(["isSubscribed"], (oldData: boolean) => {
        return !oldData
      })
      // updating subscribers when subbing or unsubbing locally
      queryClient.setQueryData(["video"], (oldVideo: VideoType) => {
        return {
          ...oldVideo,
          subscribers: isSubscribed ? oldVideo.subscribers - 1 : oldVideo.subscribers + 1
        }
      })
    }
  })

  const checkSubscription = async () => {
    if (!session || session.user.id === userId) return null
    const response = await axios.post("/api/channels/checkSubscription", {
      subscriberId: session?.user.id,
      subscribedId: userId
    })
    return response.data
  }

  const { data: isSubscribed, isLoading } = useQuery({
    queryFn: checkSubscription,
    queryKey: ["isSubscribed"]
  })

  const checkInteraction = async () => {
    if (!session) return "none"
    const response = await axios.post("/api/videos/checkInteraction", {
      userId,
      videoId
    })
    return response.data as "liked" | "disliked"
  }

  const { data: interaction } = useQuery({
    queryKey: ["videoInteraction"],
    queryFn: checkInteraction
  })

  const handleInteraction = async (action: "like" | "dislike") => {
    // checking if the user is authenticated
    if (!session) return setInteractionModalOpen(true)

    const response = await axios.post("/api/videos/handleInteractions", {
      userId,
      videoId,
      type: action
    })
    return response.data
  }

  const { mutate: mutateInteraction } = useMutation({
    mutationFn: (action: "like" | "dislike") => handleInteraction(action),
    onMutate: (action) => {
      if(!session) return
      if (action === "like" && interaction === "none") {
        queryClient.setQueryData(["videoInteraction"], () => { return "liked" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, likes: oldVideo.likes + 1 } })
        toast({ variant: "small", action: <ToastContent title="Added like" status="liked" />, duration: 1500 })
      }
      else if (action === "like" && interaction === "liked") {
        queryClient.setQueryData(["videoInteraction"], () => { return "none" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, likes: oldVideo.likes - 1 } })
        toast({ variant: "small", action: <ToastContent title="Removed like" status="none" />, duration: 1500 })
      }
      else if (action === "like" && interaction === "disliked") {
        queryClient.setQueryData(["videoInteraction"], () => { return "liked" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, likes: oldVideo.likes + 1, dislikes: oldVideo.dislikes - 1 } })
        toast({ variant: "small", action: <ToastContent title="Added like" status="liked" />, duration: 1500 })
      }
      else if (action === "dislike" && interaction === "none") {
        queryClient.setQueryData(["videoInteraction"], () => { return "disliked" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, dislikes: oldVideo.dislikes + 1 } })
        toast({ variant: "small", action: <ToastContent title="Added dislike" status="disliked" />, duration: 1500 })
      }
      else if (action === "dislike" && interaction === "disliked") {
        queryClient.setQueryData(["videoInteraction"], () => { return "none" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, dislikes: oldVideo.dislikes - 1 } })
        toast({ variant: "small", action: <ToastContent title="Removed dislike" status="none" />, duration: 1500 })
      }
      else if (action === "dislike" && interaction === "liked") {
        queryClient.setQueryData(["videoInteraction"], () => { return "disliked" })
        queryClient.setQueryData(["video"], (oldVideo: VideoType) => { return { ...oldVideo, dislikes: oldVideo.dislikes + 1, likes: oldVideo.likes - 1 } })
        toast({ variant: "small", action: <ToastContent title="Added dislike" status="disliked" />, duration: 1500 })
      }
    }
  })

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-between'>
        <InteractionModal
          isOpen={interactionModalOpen}
          setIsOpen={setInteractionModalOpen}
        />
        <SubscribeModal
          isOpen={subscribeModalOpen}
          setIsOpen={setSubscribeModalOpen}
        />
        <div className='flex flex-row items-center gap-4'>
          <div>
            <UserAvatar image={userImage} />
          </div>
          <div className='flex flex-col'>
            <a href={`/channel/${userUsername}`} className='font-semibold text-lg inline-block'>{userUsername}</a>
            <p>{subscribers} subscribers</p>
          </div>
          {!isLoading ? (session?.user.id !== userId && <Button
            className={`rounded-3xl ${isSubscribed ?
              "dark:bg-[#262726] dark:hover:bg-[#3f3e3e] bg-[#f2f3f3] hover:bg-[#e5e5e5] dark:text-white text-black" : ""}`}
            onClick={() => mutateSubscribe()}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>) : <SubscribeSkeleton />}
        </div>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row rounded-3xl'>
            {interaction ? <>
              <BasicTooltip
                text={interaction === "liked" ? "Unlike" : 'I like this'}
                styling='bg-gray-500 bg-opacity-90 p-2 border-none text-white mb-3'
                delay={200}
              >
                <button
                  onClick={() => mutateInteraction("like")}
                  className='dark:hover:bg-[#3f3e3e] dark:bg-[#262726] bg-[#f2f3f3] hover:bg-[#e5e5e5] px-7 py-2 rounded-l-3xl
                flex flex-row items-center gap-2'
                >
                  <ThumbsUp fill={interaction === "liked" ? (theme === "dark" ? "white" : "black") : "none"} />
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
                  className='dark:hover:bg-[#3f3e3e] dark:bg-[#262726] bg-[#f2f3f3] hover:bg-[#e5e5e5] px-7 py-2 rounded-e-3xl
                flex flex-row items-center gap-2'
                >
                  <p>{dislikes}</p>
                  <ThumbsDown fill={interaction === "disliked" ? (theme === "dark" ? "white" : "black") : "none"} />
                </button>
              </BasicTooltip>
            </> : <InteractionSkeleton />}
          </div>
        </div>
      </div>
      <Description views={views} created_at={created_at} description={description} />
    </div>
  );
};

export default MiddleRow;