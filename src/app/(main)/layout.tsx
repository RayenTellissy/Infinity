import React from 'react';

// components
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className='max-h-screen flex flex-col'>
      <Navbar />
      <div className='flex flex-row overflow-auto'>
        <Sidebar />
        { children }
      </div>
    </div>
  );
};

export default Layout;