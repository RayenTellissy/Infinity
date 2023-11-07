import React from 'react';

// ui components
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type BasicTooltipProps = {
  children: React.ReactNode
  text: string
}

const BasicTooltip = ({ children, text }: BasicTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          { children }
        </TooltipTrigger>
        <TooltipContent>
          { text }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BasicTooltip;