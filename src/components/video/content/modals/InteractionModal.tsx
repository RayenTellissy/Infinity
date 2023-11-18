import React, { SetStateAction } from 'react';

// ui components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

// helpers
import navigate from '@/helpers/navigate';

type InteractionModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const InteractionModal = ({ isOpen, setIsOpen }: InteractionModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle><p className='text-2xl'>Authentication Required</p></DialogTitle>
        </DialogHeader>
        <div>You need to be logged in to add interactions to a video.</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Dismiss</Button>
          <Button onClick={() => navigate("/auth")}>Log in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InteractionModal;