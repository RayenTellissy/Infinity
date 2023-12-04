import React from 'react';

// ui components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type BasicTooltipProps = {
  children: React.ReactNode
  text: string
  styling?: string
  delay?: number
  side?: "top" | "bottom" | "right" | "left"
  align?: "center" | "start" | "end"
  variant?: "gray" | "default"
}

const BasicTooltip = ({ children, text, styling, delay = 0, side, align, variant = "default" }: BasicTooltipProps) => {
  const variants = {
    gray: "text-white mt-3 bg-grayish border-none opacity-90",
    default: ""
  }

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className={`${styling} ${variants[variant]}`} side={side} align={align}>
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BasicTooltip;