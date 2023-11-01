"use client"
import React from 'react';
import { AlignJustify, UserCircle2 } from "lucide-react"
import { useRouter } from 'next/navigation';

// ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const router = useRouter()

  return (
    <div className='h-full p-2 flex flex-row items-center'>
      <Button className='p-0' size="icon" variant="icon">
        <AlignJustify />
      </Button>
      <p>Infinity</p>
      <Input className='w-1/3 m-auto' placeholder='Search' />
      <Button className='p-3 flex gap-1' variant="icon" onClick={() => router.push("/auth")}>
        <UserCircle2 />
        <p>Sign in</p>
      </Button>
    </div>
  );
};

export default Navbar;