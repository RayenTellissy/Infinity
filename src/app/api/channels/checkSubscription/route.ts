import { NextRequest, NextResponse } from "next/server";

// lib
import { getSession } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { subscribedId, subscriberId } = await req.json()

    const isSubscribed = await db.subscribers.findFirst({
      where: {
        subscriberId,
        subscribedId
      }
    })

    if(isSubscribed) return NextResponse.json(true, { status: 200 })

    return NextResponse.json(false, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}