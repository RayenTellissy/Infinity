import React, { Key } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import SidebarChannel from './SidebarChannel';

type SubscriptionType = {
  subscribed: {
    username: string
    image: string
  }
}

const SidebarSubscriptions = () => {
  const { data: session } = useSession()

  const fetchSubscriptions = async () => {
    const response = await axios.get(`/api/channels/fetchSubscriptions/${session?.user.id}`)
    return response.data
  }

  const { data: subscriptions, isLoading } = useQuery({
    queryFn: fetchSubscriptions,
    queryKey: ["subscriptions"]
  })

  return (
    <div className='py-1'>
      <p className='font-bold ml-3'>Subscriptions</p>
      <div className='flex flex-col py-1'>
        {subscriptions && subscriptions.length !== 0 && subscriptions.map((e: SubscriptionType, i: Key) => {
          return <SidebarChannel key={i} username={e.subscribed.username} image={e.subscribed.image} />
        })}
      </div>
    </div>
  );
};

export default SidebarSubscriptions;