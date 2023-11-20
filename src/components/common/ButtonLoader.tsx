import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonLoaderProps = {
  size?: number
  color?: string
}

const ButtonLoader = ({ size = 30, color }: ButtonLoaderProps) => {
  return (
    <Loader2
      size={size}
      color={color}
      className="animate-spin"
    />
  );
};

export default ButtonLoader;