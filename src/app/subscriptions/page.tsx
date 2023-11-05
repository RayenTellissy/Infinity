"use client"
import React, { useContext } from "react";
import { Context } from "@/components/context/Context";
import Subscriptions from "@/components/subscriptions/Subscriptions";

const page = () => {
  const { user } = useContext(Context)
  
  if(!user.loggedIn) {
    window.location.href = "/auth"
    return
  }

  return <Subscriptions id={user.id as string} />
}

export default page