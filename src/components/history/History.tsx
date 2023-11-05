"use client"
import React, { useContext, useEffect } from "react"
import { Context } from "@/components/context/Context"

// hooks
import useLocalStorage from "@/hooks/useLocalStorage"

const History = () => {
  const { user } = useContext(Context)
  const { getItem } = useLocalStorage("history")

  return (
    <div>
      this is history
    </div>
  )
}

export default History