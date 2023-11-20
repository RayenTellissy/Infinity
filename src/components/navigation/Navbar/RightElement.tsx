"use client"
import React from 'react';
import { useSession } from 'next-auth/react';

// ui components
import { Button } from '@/components/ui/button';

// icons
import { Upload, UserCircle2 } from 'lucide-react';

// components
import AuthLoading from './AuthLoading';
import AvatarPopover from './Buttons/AvatarPopover';
import UploadButton from './Buttons/UploadButton';
import SignInButton from './Buttons/SignInButton';
import MoreOptions from './Buttons/MoreOptions';

const RightElement = () => {
  const { data: session, status } = useSession()

  const isAuthenticated = () => {
    if (status === "authenticated") return true
    else if (status === "unauthenticated") return false
  }

  if (status === "loading") {
    return <AuthLoading />
  }

  return (
    <div className='flex flex-row items-center gap-3 mr-4'>
      {!isAuthenticated() ? <MoreOptions /> : <UploadButton />}
      {!isAuthenticated()
        ? <SignInButton />
        : <AvatarPopover username={session?.user.username as string} image={session?.user.image as string} />
      }
    </div>
  );
};

export default RightElement;