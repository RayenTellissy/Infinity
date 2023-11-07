"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

// components
import { useCon } from '@/components/context/Context';
import SidebarButton from "@/components/common/SidebarButton"
import SidebarSeperator from "@/components/common/SidebarSeperator"
import SidebarSubscriptions from "@/components/navigation/SidebarSubscriptions/SidebarSubscriptions"

// icons
import { Home, Rss, User2, LayoutDashboard, History, Clock4 } from "lucide-react"

const Sidebar = () => {
  const { user } = useCon()
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
    <div className='flex flex-col w-56 p-3'>
      <SidebarButton text="Home" icon={<Home />} callback={() => router.push("/")}/>
      <SidebarButton text="Your Channel" icon={<User2 />} callback={openChannel}/>
      <SidebarSeperator />
      <SidebarButton text="Dashboard" icon={<LayoutDashboard />} callback={openDashboard}/>
      <SidebarButton text="Subscriptions" icon={<Rss />} callback={openSubscriptions}/>
      <SidebarButton text="History" icon={<History />} callback={() => router.push("/history")}/>
      <SidebarButton text="Watch later" icon={<Clock4 />} callback={openWatchLater}/>
      <SidebarSeperator />
      <SidebarSubscriptions />
    </div>
  );
};

export default Sidebar;