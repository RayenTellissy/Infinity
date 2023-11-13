import React from 'react';

// icons
import { AlignJustify } from 'lucide-react';

// ui components
import { Button } from '@/components/ui/button';

// hooks
import { useCon } from '@/components/context/Context';

const LeftElement = () => {
  const { showSidebar, setShowSidebar } = useCon()

  return (
    <>
      <Button className='p-0' size="icon" variant="icon" onClick={() => setShowSidebar(!showSidebar)}>
        <AlignJustify />
      </Button>
      <p>Infinity</p>
    </>
  );
};

export default LeftElement;