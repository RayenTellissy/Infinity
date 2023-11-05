import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components
import Loader from "@/components/common/Loader";

type SubscriptionsProps = {
  id: string
}

const Subscriptions = ({ id }: SubscriptionsProps) => {

  const fetchSubscriptions = async () => {
    const response = await axios.get(`/api/subscriptions/${id}`)
    return response.data
  }

  const { data: subscriptions, isLoading } = useQuery({
    queryFn: fetchSubscriptions,
    queryKey: ["subscriptions"]
  })

  if(isLoading) return <Loader />

  return (
    <div>
      this is subscriptions
    </div>
  )
}

export default Subscriptions