import React from 'react';

// ui components
import { Input } from '@/components/ui/input';

// components
import LeftElement from './Navbar/LeftElement';
import RightElement from './Navbar/RightElement';

const Navbar = () => {

  return (
    <div className='h-full p-2 flex flex-row items-center'>
      <LeftElement />
      <Input className='w-1/3 m-auto' placeholder='Search' />
      <RightElement />
    </div>
  );
};

export default Navbar;