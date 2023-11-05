import React from 'react';

// ui components
import { Button } from "@/components/ui/button"

type SideBarButtonProps = {
  text: string
  callback: () => void
}

const SidebarButton = ({ text, callback }: SideBarButtonProps) => {
  return <Button variant="ghost" onClick={callback}>{ text }</Button>
};

export default SidebarButton;