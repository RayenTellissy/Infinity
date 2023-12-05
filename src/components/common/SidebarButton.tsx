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
    className={`flex flex-col xl:flex-row items-center justify-start gap-2 xl:gap-5 text-xs xl:text-sm ${path === route && "bg-accent font-bold"} text-center xl:px-3 py-4 xl:py-2 rounded-lg hover:bg-accent`}
    href={route}
  >
    { icon && icon }
    { text }
  </Link>
};

export default SidebarButton;