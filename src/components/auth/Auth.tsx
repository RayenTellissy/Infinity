"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from '@/components/ui/toast';

// constants
import { usernameRegex, emailRegex, passwordRegex } from '@/constants/constants';

const Auth = () => {
  const [username,setUsername] = useState("") // this state is shared between login and sign up for UX
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [tabValue,setTabValue] = useState("signin")
  const { toast } = useToast()
  const router = useRouter()
  
  const handleLogin = async () => {
    const response = await axios.post("/api/auth/login", {
      username,
      password
    })
    return response.data
  }
  
  const { mutate: loginMutation } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (response) => {
      // console.log(response) //! here use the response to set the context user state
      router.push("/")
    },
    onError: (error: any) => {
      const errorCode = error.response.data.code
      if(errorCode === "NOEXIST") handleWrongUsername()
      else if(errorCode === "INCPWD") handleWrongPassword()
    }
  })

  const handleSignup = async () => {
    if(!usernameRegex.test(username))
    await axios.post("/api/auth/signup", {
      username,
      email,
      password
    })
  }
  
  const handleWrongUsername = () => {
    toast({
      description: "Username doesn't exist",
      action: <ToastAction altText='sign up' onClick={() => setTabValue("signup")}>
        Sign Up Now!
      </ToastAction>
    })
  }

  const handleWrongPassword = () => {
    toast({
      description: "Password Incorrect."
    })
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Tabs value={tabValue} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" onClick={() => setTabValue("signin")}>Sign In</TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setTabValue("signup")}>Sign Up</TabsTrigger>
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
                <Input id="login-username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input type='password' id="login-password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => loginMutation()}>Sign in!</Button>
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
                <Input id="signup-username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignup}>Create Account!</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;