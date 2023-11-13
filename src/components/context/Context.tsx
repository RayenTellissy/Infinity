"use client"
import React, { createContext, useContext, useState } from 'react';

type ContextType = {
  currentPage: string
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  showNav: boolean
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ContextType>({
  currentPage: "",
  setCurrentPage: () => {},
  showSidebar: true,
  setShowSidebar: () => {},
  showNav: true,
  setShowNav: () => {}
})

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage,setCurrentPage] = useState("")
  const [showSidebar,setShowSidebar] = useState(true)
  const [showNav,setShowNav] = useState(true)
  
  return (
    <Context.Provider value={{
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