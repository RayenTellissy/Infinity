"use client"
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { SignInResponse } from 'next-auth/react';

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

// components
import ButtonLoader from '../common/ButtonLoader';

// constants
import { usernameRegex, emailRegex, passwordRegex } from '@/constants/constants';

const Auth = () => {
  const [username,setUsername] = useState("") // this state is shared between login and sign up for UX
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("") // this state is shared between login and sign up for UX
  const [tabValue,setTabValue] = useState("signin")
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress)
    return () => document.removeEventListener("keypress", handleKeyPress)
  }, [username, password])

  const handleLogin = async () => {
    if(!username) return createToast("Please provide a username.")
    if(!password) return createToast("Please provide a password.")
    try {
      setIsLoading(true)
      const response: SignInResponse | undefined = await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      setIsLoading(false)
      // if the user logged in succesfully, redirect him to main page
      if(response?.ok) return router.push("/")
      if(response?.error) {
        if(response.error === "INCUSR") return handleWrongUsername()
        if(response.error === "INCPWD") return handleWrongPassword()
      }
    }
    catch(error: any) {
      console.log(error)
    }
  }

  const handleSignup = async () => {
    // form validation
    if(!usernameRegex.test(username)) throw new Error("Invalid username format.")
    if(!emailRegex.test(email)) throw new Error("Invalid email format.")
    if(!passwordRegex.test(password)) throw new Error("Password is too short.")

    const response = await axios.post("/api/auth/signup", {
      username,
      email,
      password
    })
    return response.data
  }

  const { mutate: signUpMutation } = useMutation({
    mutationFn: handleSignup,
    onSuccess: async () => {
      await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      router.push("/")
    },
    onError: (error: AxiosError) => {
      if(error.response?.data === "USEREXISTS") {
        return toast({
          description: `User with the username "${username}" already exists`,
          duration: 3000
        })
      }
      toast({
        variant: "destructive",
        description: error.message,
        duration: 3000
      })
    }
  })
  
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
      description: "Incorrect Password.",
      duration: 3000
    })
  }

  const createToast = (description: string) => {
    toast({
      description
    })
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if(e.key.toLowerCase() === "enter") {
      handleLogin()
    }
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
              <Button onClick={handleLogin}>{isLoading ? <ButtonLoader /> : "Sign in"}</Button>
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
              <Button onClick={() => signUpMutation()}>Create Account!</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;