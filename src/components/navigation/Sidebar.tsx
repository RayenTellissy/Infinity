"use client"
import React from 'react';
import { useSession } from 'next-auth/react';

// components
import SidebarButton from "@/components/common/SidebarButton"
import SidebarSeperator from "@/components/common/SidebarSeperator"
import SidebarSubscriptions from "@/components/navigation/Sidebar/SidebarSubscriptions"
import NoSessionSubscriptions from './Sidebar/NoSession/NoSessionSubscriptions';

// icons
import { Home, Rss, User2, LayoutDashboard, History, Clock4 } from "lucide-react"

const Sidebar = () => {
  const { data: session, status } = useSession()

  const handleMyChannel = () => {
    if(status === "unauthenticated") return "/auth"
    return `/channel/${session?.user.username}`
  }

  return (
    <div className='w-[100px] xl:w-[224px] hidden sm:flex flex-col p-3 sticky top-0 overflow-y-auto'>
      <SidebarButton text="Home" icon={<Home />} route="/"/>
      <SidebarButton text="Your Channel" icon={<User2 />} route={handleMyChannel()}/>
      <SidebarSeperator />
      <SidebarButton text="Dashboard" icon={<LayoutDashboard />} route="/dashboard"/>
      <SidebarButton text="Subscriptions" icon={<Rss />} route="/subscriptions"/>
      <SidebarButton text="History" icon={<History />} route='/history'/>
      <SidebarButton text="Watch later" icon={<Clock4 />} route='/watchlater'/>
      <div className='hidden xl:block'>
        <SidebarSeperator />
        {session ? <SidebarSubscriptions /> : <NoSessionSubscriptions />}
      </div>
    </div>
  );
};

export default Sidebar;