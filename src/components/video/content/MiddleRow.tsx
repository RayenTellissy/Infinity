import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// components
import UserAvatar from '@/components/common/UserAvatar';

// ui components
import { Button } from '@/components/ui/button';

type MiddleRowProps = {
  userId: string
  userUsername: string
  userImage: string | null
  subscribers: number
}

const MiddleRow = ({ userId, userUsername, userImage, subscribers }: MiddleRowProps) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  useEffect(() => {
    if(session?.user.id !== userId) {
      checkSubscription()
    }
  }, [])

  const subscribe = async () => {
    if (!session) {
      window.location.href = "/auth"
      return
    }
    const response = await axios.post("/api/channels/subscribe", {
      subscriberId: session?.user.id,
      subscribedId: userId
    })
    return response.data
  }

  const { mutate: mutateSubscribe } = useMutation({
    mutationFn: subscribe,
    onMutate: () => {
      queryClient.setQueryData(["isSubscribed"], (oldData: boolean) => {
        return !oldData
      })
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['isSubscribed'] })
    }
  })

  const checkSubscription = async () => {
    const response = await axios.post("/api/channels/checkSubscription", {
      subscriberId: session?.user.id,
      subscribedId: userId
    })
    return response.data
  }

  const { data: isSubscribed } = useQuery({
    queryFn: checkSubscription,
    queryKey: ["isSubscribed"]
  })

  return (
    <div className='flex flex-row items-center gap-4'>
      <div>
        <UserAvatar image={userImage} size={80} />
      </div>
      <div className='flex flex-col'>
        <p className='font-semibold text-lg'>{userUsername}</p>
        <p>{subscribers} subscribers</p>
      </div>
      {session?.user.id !== userId && <Button className="rounded-3xl" onClick={() => mutateSubscribe()}>
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </Button>}
    </div>
  );
};

export default MiddleRow;