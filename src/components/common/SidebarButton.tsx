import React, { useContext } from 'react';
import { Context } from "@/components/context/Context"

// ui components
import { Button } from "@/components/ui/button"

type SideBarButtonProps = {
  text: string
  callback: () => void
  icon: React.ReactElement
}

const SidebarButton = ({ text, callback, icon }: SideBarButtonProps) => {
  const { currentPage } = useContext(Context)

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