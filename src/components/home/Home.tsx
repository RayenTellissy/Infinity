"use client"
import React, { useEffect } from 'react';
import { useCon } from "@/components/context/Context"

// ui components
import { ModeToggle } from "@/components/ui/theme-toggle"

const Home = () => {
  const { setCurrentPage } = useCon()

  useEffect(() => {
    setCurrentPage("Home")
  }, [])
  
  return (
    <div className='h-full'>
      <ModeToggle />
    </div>
  );
};

export default Home;