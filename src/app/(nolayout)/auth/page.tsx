"use client"
import React, { useContext } from 'react';
import Auth from '@/components/auth/Auth';
import { Context } from '@/components/context/Context';

const page = () => {
  const { user } = useContext(Context)
  
  if(user.loggedIn) {
    window.location.href = "/"
    return
  }

  return <Auth />
};

export default page;