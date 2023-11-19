"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// components
import SidebarButton from "@/components/common/SidebarButton"
import SidebarSeperator from "@/components/common/SidebarSeperator"
import SidebarSubscriptions from "@/components/navigation/Sidebar/SidebarSubscriptions"

// icons
import { Home, Rss, User2, LayoutDashboard, History, Clock4 } from "lucide-react"

const Sidebar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleMyChannel = () => {
    if(status === "unauthenticated") return "/auth"
    return `/channel/${session?.user.username}`
  }

  return (
    <div className='w-[224px] flex flex-col p-3'>
      <SidebarButton text="Home" icon={<Home />} route="/"/>
      <SidebarButton text="Your Channel" icon={<User2 />} route={handleMyChannel()}/>
      <SidebarSeperator />
      <SidebarButton text="Dashboard" icon={<LayoutDashboard />} route="/dashboard"/>
      <SidebarButton text="Subscriptions" icon={<Rss />} route="/subscriptions"/>
      <SidebarButton text="History" icon={<History />} route='/history'/>
      <SidebarButton text="Watch later" icon={<Clock4 />} route='/watchlater'/>
      <SidebarSeperator />
      <SidebarSubscriptions />
    </div>
  );
};

export default Sidebar;