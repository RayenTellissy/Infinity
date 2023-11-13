"use client"
import React from 'react';

// components
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useCon } from "@/components/context/Context"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showSidebar, showNav } = useCon()

  return (
    <div>
      {showNav && <Navbar />}
      <div className='flex flex-row'>
        {showSidebar && <Sidebar />}
        { children }
      </div>
    </div>
  );
};

export default Layout;