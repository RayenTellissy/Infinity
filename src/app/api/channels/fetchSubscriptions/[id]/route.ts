import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const channels = await db.subscribers.findMany({
      where: {
        subscriberId: params.id
      },
      select: {
        subscribed: {
          select: {
            username: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json(channels, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}