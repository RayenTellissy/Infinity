import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, videoId } = await req.json()

    await db.videoDislikes.create({
      data: {
        userId,
        videoId
      }
    })

    return new NextResponse("disliked video!", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}