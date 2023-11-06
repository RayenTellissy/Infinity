"use client"
import React, { useContext } from 'react';
import axios from 'axios';
import { AlignJustify, UserCircle2 } from "lucide-react"
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context/Context';

// ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// icons
import { Upload } from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useContext(Context)
  const router = useRouter()

  const logout = async () => {
    await axios.get("/api/auth/logout", {
      withCredentials: true
    })
    setUser({ loggedIn: false })
  }

  return (
    <div className='h-full p-2 flex flex-row items-center'>
      <Button className='p-0' size="icon" variant="icon">
        <AlignJustify />
      </Button>
      <p>Infinity</p>
      <Input className='w-1/3 m-auto' placeholder='Search' />
      <div className='flex flex-row items-center gap-3'>
        <Button className='w-10 h-10 p-0 rounded-full' variant="ghost" onClick={() => router.push("/upload")}>
          <Upload />
        </Button>
        {user.loggedIn && <Button onClick={logout}>Logout</Button>}
        {!user.loggedIn ? <Button className='p-3 flex gap-1' variant="icon" onClick={() => router.push("/auth")}>
          <UserCircle2 />
          <p>Sign in</p>
        </Button> : <p>{ user.username }</p>}
      </div>
    </div>
  );
};

export default Navbar;