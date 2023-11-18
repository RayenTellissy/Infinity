import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, videoId } = await req.json()

    const isLiked = await db.videoLikes.findFirst({
      where: {
        userId,
        videoId
      }
    })

    if(isLiked) return new NextResponse("liked", { status: 200 })

    const isDisliked = await db.videoDislikes.findFirst({
      where: {
        userId,
        videoId
      }
    })

    if(isDisliked) return new NextResponse("disliked", { status: 200 })

    return new NextResponse("none", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}