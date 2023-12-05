"use client"
import React, { useState } from 'react';
import { useTheme } from "next-themes"

// icons
import { Keyboard, Moon, MoreVertical, Sun } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// components
import BasicTooltip from '@/components/common/BasicTooltip';
import Shortcuts from '../Shortcuts';
import IconButton from '@/components/common/IconButton';

const MoreOptions = () => {
  const { theme, setTheme } = useTheme()
  const [modalOpen,setModalOpen] = useState(false)

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
        <BasicTooltip text='More options' side="bottom" styling='mt-3 bg-grayish border-none opacity-90'>
          <Button className='h-8 w-8 rounded-full p-1.5' variant="ghost" asChild>
            <MoreVertical />
          </Button>
        </BasicTooltip>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='end'>
        <div className='flex flex-col'>
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
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreOptions;