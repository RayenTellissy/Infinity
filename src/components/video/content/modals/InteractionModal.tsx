"use client"
import React, { SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

// ui components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

type InteractionModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const InteractionModal = ({ isOpen, setIsOpen }: InteractionModalProps) => {
  const router = useRouter()  

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle><p className='text-2xl'>Authentication Required</p></DialogTitle>
        </DialogHeader>
        <div>You need to be logged in to add interactions to a video.</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Dismiss</Button>
          <Button onClick={() => router.push("/auth")}>Log in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InteractionModal;