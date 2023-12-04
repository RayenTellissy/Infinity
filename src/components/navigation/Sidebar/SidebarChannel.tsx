"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// components
import UserAvatar from '@/components/common/UserAvatar';

type SidebarChannelProps = {
  username: string
  image: string | null
}

const SidebarChannel = ({ username, image }: SidebarChannelProps) => {
  const path = usePathname()

  const isInChannel = () => {
    return path === `/channel/${username}`
  }

  return (
    <Link
      className={`flex flex-row justify-start w-full h-11 p-2 rounded-xl py-2 hover:bg-accent ${isInChannel() && "bg-accent"}`}
      href={`/channel/${username}`}
    >
      <div className='mr-3'>
        <UserAvatar size={30} image={image} />
      </div>
      { username }
    </Link>
  );
};

export default SidebarChannel;