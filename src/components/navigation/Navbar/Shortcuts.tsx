import React, { SetStateAction, useEffect, useRef } from 'react';

// ui components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type ShortcutsProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Shortcuts = ({ isOpen, setIsOpen }: ShortcutsProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleClickOutside = (e: MouseEvent) => {
    if(modalRef.current && !(modalRef.current as HTMLDivElement).contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[800px]" ref={modalRef}>
        <DialogHeader>
          <DialogTitle><p className='text-2xl'>Keyboard shortcuts</p></DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2 my-2'>
          <p className='dark:text-gray-400 text-black my-2'>PLAYBACK</p>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Toggle play/pause</p>
            <p className='dark:text-white text-'>Spacebar</p>
          </div>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Fast forward 5 seconds</p>
            <p className='dark:text-white text-black'>→</p>
          </div>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Rewind 5 seconds</p>
            <p className='dark:text-white text-black'>←</p>
          </div>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Toggle fullscreen</p>
            <p className='dark:text-white text-black'>f</p>
          </div>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Toggle miniplayer</p>
            <p className='dark:text-white text-black'>i</p>
          </div>
          <Separator />
          <div className='flex flex-row justify-between'>
            <p className='dark:text-gray-400 text-gray-600'>Toggle mute</p>
            <p className='dark:text-white text-black'>m</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Dismiss</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Shortcuts;