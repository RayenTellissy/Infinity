"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarButtonProps = {
  text: string
  route: string
  icon: React.ReactElement
}

const SidebarButton = ({ text, route, icon }: SidebarButtonProps) => {
  const path = usePathname()

  return <Link
    className={`flex flex-row items-center justify-start gap-5 text-sm ${path === route && "bg-accent"} px-3 py-2 rounded-lg hover:bg-accent`}
    href={route}
  >
    { icon && icon }
    { text }
  </Link>
};

export default SidebarButton;