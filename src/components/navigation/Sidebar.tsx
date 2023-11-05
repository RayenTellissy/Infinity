"use client"
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Context } from '@/components/context/Context';

// ui components
import { Button } from "@/components/ui/button"

const Sidebar = () => {
  const { user } = useContext(Context)
  const router = useRouter()

  const authenticationCheck = () => {
    if(!user.loggedIn) return router.push("/auth")
  }

  const openChannel = () => {
    if(!user.loggedIn) return router.push("/auth")
    router.push(`/channel/${user.username}`)
  }

  const openDashboard =  () => {
    if(!user.loggedIn) return router.push("/auth")
    router.push(`/dashboard`)
  }

  const openSubscriptions = () => {
    if(!user.loggedIn) return router.push("/auth")
    router.push("/subscriptions")
  }

  const openHistory = () => {
    router.push("/history")
  }

  return (
    <div className='flex-column gap-2'>
      <Button onClick={openChannel}>Your channel</Button>
      <Button onClick={openDashboard}>Dashboard</Button>
      <Button onClick={openSubscriptions}>Subscriptions</Button>
      <Button onClick={openHistory}>History</Button>
    </div>
  );
};

export default Sidebar;