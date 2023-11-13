import React from 'react';

// ui components
import { Button } from '../ui/button';

type IconButtonProps = {
  icon: React.ReactElement
  text: string
  callback: () => void
}

const IconButton = ({ icon, text, callback }: IconButtonProps) => {
  return (
    <Button className='flex flex-row items-center justify-start gap-3 rounded-none' variant="ghost" onClick={callback}>
      { icon }
      { text }
    </Button>
  );
};

export default IconButton;