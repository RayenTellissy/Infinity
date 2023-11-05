import React from 'react';

// components
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className='flex flex-row'>
        <Sidebar />
        { children }
      </div>
    </div>
  );
};

export default layout;