"use client"
import React, { useContext } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { Context } from "@/components/context/Context";

const page = () => {
  const { user } = useContext(Context)

  if(!user.loggedIn) {
    window.location.href = "/auth"
    return
  }

  return <Dashboard />
}

export default page