"use client"
import React, { useContext, useEffect } from 'react';
import { Context } from "@/components/context/Context"

// ui components
import { ModeToggle } from "@/components/ui/theme-toggle"

const Home = () => {
  const { setCurrentPage } = useContext(Context)

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