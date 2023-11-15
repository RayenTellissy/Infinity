"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// components
import Loader from "@/components/common/Loader";

// hooks
import { useCon } from "../context/Context";

const Subscriptions = () => {
  const { setCurrentPage } = useCon()

  useEffect(() => {
    setCurrentPage("Subscriptions")
  }, [])

  const fetchSubscriptions = async () => {
    // const response = await axios.get(`/api/subscriptions/${id}`)
    // return response.data
  }

  // const { data: subscriptions, isLoading } = useQuery({
  //   queryFn: fetchSubscriptions,
  //   queryKey: ["subscriptions"]
  // })

  // if(isLoading) return <Loader />

  return (
    <div>
      this is subscriptions
    </div>
  )
}

export default Subscriptions