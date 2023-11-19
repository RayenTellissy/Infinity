import React from 'react';

// ui components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type BasicTooltipProps = {
  children: React.ReactNode
  text: string
  styling?: string
  delay?: number
}

const BasicTooltip = ({ children, text, styling, delay = 0 }: BasicTooltipProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent className={styling}>
          { text }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BasicTooltip;