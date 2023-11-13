"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// ui components
import { Button } from '@/components/ui/button';

// icons
import { Upload, UserCircle2 } from 'lucide-react';

// components
import AuthLoading from './AuthLoading';
import UserAvatar from '@/components/common/UserAvatar';
import AvatarPopover from './AvatarPopover';

const RightElement = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = () => {
    if (status === "authenticated") return true
    else if (status === "unauthenticated") return false
  }

  if (status === "loading") {
    return <AuthLoading />
  }

  return (
    <div className='flex flex-row items-center gap-3 mr-4'>
      <Button className='w-10 h-10 p-0 rounded-full' variant="ghost" onClick={() => router.push("/upload")}>
        <Upload />
      </Button>
      {!isAuthenticated() ? <Button className='p-3 flex gap-1' variant="icon" onClick={() => router.push("/auth")}>
        <UserCircle2 />
        <p>Sign in</p>
      </Button> : <AvatarPopover username={session?.user.username as string} image={session?.user.image as string} />}
    </div>
  );
};

export default RightElement;