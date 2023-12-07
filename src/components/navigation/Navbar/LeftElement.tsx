"use client"
import React from 'react';

// icons
import { AlignJustify } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

const LeftElement = () => {

  const hideSidebar = () => {
    //TODO: finish this function
  }

  return (
    <>
      <Button aria-label='sidebar controller' className='p-0' size="icon" variant="icon" onClick={hideSidebar}>
        <AlignJustify />
      </Button>
      <p>Infinity</p>
    </>
  );
};

export default LeftElement;