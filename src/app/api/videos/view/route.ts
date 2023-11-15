import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return NextResponse.json("UNAUTHORIZED", { status: 401 })

    const { userId, videoId } = await req.json()

    const alreadyViewed = await db.videoViews.findFirst({
      where: {
        viewerId: userId,
        videoId
      }
    })

    if(alreadyViewed) return NextResponse.json("Already viewed.", { status: 304 })

    await db.videoViews.create({
      data: {
        viewerId: userId,
        videoId
      }
    })

    return NextResponse.json("success", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}