import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZEZ", { status: 401 })

    const { subscribedId, subscriberId } = await req.json()

    await db.subscribers.deleteMany({
      where: {
        subscribedId,
        subscriberId
      }
    })

    return new NextResponse("unsubscribed.", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}