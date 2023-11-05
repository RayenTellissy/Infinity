"use client"
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Context } from '@/components/context/Context';
import SidebarButton from "@/components/common/SidebarButton"
import SidebarSeperator from "@/components/common/SidebarSeperator"
import SidebarSubscriptions from "@/components/navigation/SidebarSubscriptions/SidebarSubscriptions"

const Sidebar = () => {
  const { user } = useContext(Context)
  const router = useRouter()

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

  const openWatchLater = () => {
    if(!user.loggedIn) return router.push("/auth")
    router.push("/watchlater")
  }

  return (
    <div className='flex flex-col w-52'>
      <SidebarButton text="Home" callback={() => router.push("/")}/>
      <SidebarButton text="Your Channel" callback={openChannel}/>
      <SidebarSeperator />
      <SidebarButton text="Dashboard" callback={openDashboard}/>
      <SidebarButton text="Subscriptions" callback={openSubscriptions}/>
      <SidebarButton text="History" callback={() => router.push("/history")}/>
      <SidebarButton text="Watch later" callback={openWatchLater}/>
      <SidebarSeperator />
      <SidebarSubscriptions />
    </div>
  );
};

export default Sidebar;