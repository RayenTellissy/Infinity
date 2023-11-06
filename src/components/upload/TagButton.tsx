import React from 'react';

// ui components
import { Button } from "@/components/ui/button"

type TagButtonProps = {
  text: string
  callback: (text: string) => void
}

const TagButton = ({ text, callback }: TagButtonProps) => {
  return <Button className="" onClick={() => callback(text)}>{ text }</Button>
};

export default TagButton;