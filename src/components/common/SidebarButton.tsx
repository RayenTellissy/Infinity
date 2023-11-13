import React from 'react';

// hooks
import { useCon } from "@/components/context/Context"

// ui components
import { Button } from "@/components/ui/button"

type SidebarButtonProps = {
  text: string
  callback: () => void
  icon: React.ReactElement
}

const SidebarButton = ({ text, callback, icon }: SidebarButtonProps) => {
  const { currentPage } = useCon()

  return <Button
    className={`flex flex-row items-center justify-start gap-5 ${currentPage === text && "bg-accent"}`}
    variant="ghost"
    onClick={callback}
  >
    { icon && icon }
    { text }
  </Button>
};

export default SidebarButton;