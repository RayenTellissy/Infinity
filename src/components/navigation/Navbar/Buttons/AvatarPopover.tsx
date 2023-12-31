"use client"
import React, { useState } from 'react';
import Link from "next/link"
import { useTheme } from 'next-themes';
import { signOut } from 'next-auth/react';

// icons
import { Moon, Sun, Keyboard, UserCog2, LogOut } from 'lucide-react';

// ui components
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

// components
import UserAvatar from '@/components/common/UserAvatar';
import IconButton from '@/components/common/IconButton';
import IconLink from '@/components/common/IconLink';
import Shortcuts from '../Shortcuts';

type AvatarPopoverProps = {
  username: string
  image: string
}

const AvatarPopover = ({ username, image }: AvatarPopoverProps) => {
  const { theme, setTheme } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)

  const handleTheme = () => {
    if (theme === "light") return setTheme("dark")
    setTheme("light")
  }

  const openShortcuts = () => {
    setModalOpen(true)
  }

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar image={image} />
      </PopoverTrigger>
      <PopoverContent align='end' side='right' className='m-2 p-0'>
        <div className='flex flex-col'>
          <div className='flex flex-row gap-3 p-3'>
            <div>
              <UserAvatar image={image} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg font-medium'>{username}</p>
              <Link className="text-sm text-[#007bff]" href={`/channel/${username}`}>View your channel</Link>
            </div>
          </div>
          <Separator />
          <div className='flex flex-col py-3'>
            <IconButton
              icon={theme === "light" ? <Sun /> : <Moon />}
              text={`Theme: Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
              callback={handleTheme}
            />
            <Shortcuts isOpen={modalOpen} setIsOpen={setModalOpen} />
            <IconButton
              icon={<Keyboard />}
              text='Keyboard shortcuts'
              callback={openShortcuts}
            />
            <IconLink
              icon={<UserCog2 />}
              text='Account settings'
              route={"/settings"}
            />
            <IconButton
              icon={<LogOut />}
              text='Sign out'
              callback={() => signOut()}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopover;