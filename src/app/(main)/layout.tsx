"use client"
import React from 'react';

// components
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useCon } from "@/components/context/Context"

const layout = ({ children }: { children: React.ReactNode }) => {
  const { showSidebar } = useCon()

  return (
    <div>
      <Navbar />
      <div className='flex flex-row'>
        {showSidebar && <Sidebar />}
        { children }
      </div>
    </div>
  );
};

export default layout;