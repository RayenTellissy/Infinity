"use client"
import React from "react"
import { Context } from "@/components/context/Context"

// hooks
import useLocalStorage from "@/hooks/useLocalStorage"

const History = () => {
  const { getItem } = useLocalStorage("history")

  return (
    <div>
      this is history
    </div>
  )
}

export default History