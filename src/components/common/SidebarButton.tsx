import React from 'react';
import { useRouter } from 'next/navigation';

// hooks
import { useCon } from "@/components/context/Context"

// ui components
import { Button } from '../ui/button';

type SidebarButtonProps = {
  text: string
  route: string
  icon: React.ReactElement
}

const SidebarButton = ({ text, route, icon }: SidebarButtonProps) => {
  const { currentPage } = useCon()
  const router = useRouter()

  return <Button
    className={`flex flex-row items-center justify-start gap-5 ${currentPage === text && "bg-accent"}`}
    variant="ghost"
    onClick={() => router.push(route)}
  >
    { icon && icon }
    { text }
  </Button>
};

export default SidebarButton;