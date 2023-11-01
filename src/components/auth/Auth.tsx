"use client"
import React, { useState } from 'react';
import axios from 'axios';

// ui components
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Auth = () => {
  const [username,setUsername] = useState("") // this state is shared between login and sign up for UX
  const [loginPassword,setLoginPassword] = useState("")

  const handleLogin = async () => {
    if(!username || !loginPassword) return
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
      username,
      password: loginPassword
    })

    console.log(response.data)
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In to Infinity!</CardTitle>
              <CardDescription>
                Welcome Back
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-username">Username</Label>
                <Input id="login-username" onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input type='password' id="login-password" onChange={e => setLoginPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Sign in!</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Welcome to Infinity!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Account!</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;