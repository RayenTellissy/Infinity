"use client"
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// types
import { user } from './ContextTypes';

type ContextType = {
  user: user
  setUser: React.Dispatch<React.SetStateAction<user>>
  currentPage: string
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export const Context = createContext<ContextType>({
  user: { loggedIn: null },
  setUser: () => {},
  currentPage: "",
  setCurrentPage: () => {}
})

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<user>({ loggedIn: null })
  const [currentPage,setCurrentPage] = useState("")
  
  useEffect(() => {
    authMutation()
  }, [])

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])
  
  const authenticateUser = async () => {
    const response = await axios.get("/api/auth/authenticateUser", {
      withCredentials: true
    })
    return response.data
  }
  
  const { mutate: authMutation } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (response) => {
      setUser(response)
    },
    onError: () => {
      setUser({ loggedIn: false })
    }
  })

  if(user.loggedIn === null) return <div>Authenticating...</div>
  
  return (
    <Context.Provider value={{
      user,
      setUser,
      currentPage,
      setCurrentPage
    }}>
      { children }
    </Context.Provider>
  );
};