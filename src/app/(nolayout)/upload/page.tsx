"use client"
import React, { useContext } from 'react';
import Upload from '@/components/upload/Upload';
import { Context } from '@/components/context/Context';

const page = () => {
  const { user } = useContext(Context)

  if(!user.loggedIn) {
    window.location.href = "/auth"
    return
  }

  return <Upload />
};

export default page;