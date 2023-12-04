import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// components
import Loader from "@/components/common/Loader";

const Subscriptions = () => {

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