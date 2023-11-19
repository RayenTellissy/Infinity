import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { subscriberId, subscribedId } = await req.json()

    if(subscriberId === subscribedId) return new NextResponse("can't subscribe to yourself", { status: 401 })

    await db.subscribers.create({
      data: {
        subscriberId,
        subscribedId
      }
    })

    return new NextResponse("subscribed successfully.", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}