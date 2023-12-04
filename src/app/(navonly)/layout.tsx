import React from 'react';

// components
import Navbar from '@/components/navigation/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='max-h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-row overflow-auto'>
        { children }
      </div>
    </div>
  );
};

export default Layout;