"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

// types
import { user } from './ContextTypes';

type ContextType = {
  user: user
  setUser: React.Dispatch<React.SetStateAction<user>>
  currentPage: string
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  showNav: boolean
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextType>({
  user: { loggedIn: null },
  setUser: () => {},
  currentPage: "",
  setCurrentPage: () => {},
  showSidebar: true,
  setShowSidebar: () => {},
  showNav: true,
  setShowNav: () => {}
})

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<user>({ loggedIn: null })
  const [currentPage,setCurrentPage] = useState("")
  const [showSidebar,setShowSidebar] = useState(true)
  const [showNav,setShowNav] = useState(true)
  
  useEffect(() => {
    authMutation()
  }, [])
  
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
      setCurrentPage,
      showSidebar,
      setShowSidebar,
      showNav,
      setShowNav
    }}>
      { children }
    </Context.Provider>
  );
};

export const useCon = () => {
  return useContext(Context)
}