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
    if(status === "unauthenticated") return router.push("/auth")
    router.push(`/channel/${session?.user.username}`)
  }

  return (
    <div className='flex flex-col w-56 p-3'>
      <SidebarButton text="Home" icon={<Home />} callback={() => router.push("/")}/>
      <SidebarButton text="Your Channel" icon={<User2 />} callback={handleMyChannel}/>
      <SidebarSeperator />
      <SidebarButton text="Dashboard" icon={<LayoutDashboard />} callback={() => router.push(`/dashboard`)}/>
      <SidebarButton text="Subscriptions" icon={<Rss />} callback={() => router.push("/subscriptions")}/>
      <SidebarButton text="History" icon={<History />} callback={() => router.push("/history")}/>
      <SidebarButton text="Watch later" icon={<Clock4 />} callback={() => router.push("/watchlater")}/>
      <SidebarSeperator />
      <SidebarSubscriptions />
    </div>
  );
};

export default Sidebar;