"use client"
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

// ui components
import { Button } from '../ui/button';

type SidebarButtonProps = {
  text: string
  route: string
  icon: React.ReactElement
}

const SidebarButton = ({ text, route, icon }: SidebarButtonProps) => {
  const router = useRouter()
  const path = usePathname()

  return <Button
    className={`flex flex-row items-center justify-start gap-5 ${path === route && "bg-accent"}`}
    variant="ghost"
    onClick={() => router.push(route)}
  >
    { icon && icon }
    { text }
  </Button>
};

export default SidebarButton;