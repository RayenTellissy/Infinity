"use client"
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

// context
import { useCon } from '@/components/context/Context';

// helpers
import isYourChannel from '@/helpers/isYourChannel';

type ChannelProps = {
  username: string
}

const Channel = ({ username }: ChannelProps) => {
  const { setCurrentPage } = useCon()
  const { data: session } = useSession()

  useEffect(() => {
    if(isYourChannel(username, session?.user.username as string)) {
      setCurrentPage("Your Channel")
    }
  }, [])

  return (
    <div>
      
    </div>
  );
};

export default Channel;