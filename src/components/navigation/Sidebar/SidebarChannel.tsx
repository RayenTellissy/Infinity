import React from 'react';
import { useRouter } from 'next/navigation';

// ui components
import { Button } from '@/components/ui/button';

// components
import UserAvatar from '@/components/common/UserAvatar';

// helpers
import navigate from '@/helpers/navigate';

type SidebarChannelProps = {
  username: string
  image: string | null
}

const SidebarChannel = ({ username, image }: SidebarChannelProps) => {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className='flex flex-row justify-start w-full h-11 p-2 rounded-xl'
      onClick={() => router.push(`/channel/${username}`)}
    >
      <div className='mr-3'>
        <UserAvatar image={image} />
      </div>
      { username }
    </Button>
  );
};

export default SidebarChannel;