"use client"
import React, { useEffect } from 'react';

// context
import { useCon } from '@/components/context/Context';

// helpers
import isYourChannel from '@/helpers/isYourChannel';

type ChannelProps = {
  username: string
}

const Channel = ({ username }: ChannelProps) => {
  const { user, setCurrentPage } = useCon()

  useEffect(() => {
    if(isYourChannel(username, user.username as string)) {
      setCurrentPage("Your Channel")
    }
  }, [])

  return (
    <div>
      
    </div>
  );
};

export default Channel;