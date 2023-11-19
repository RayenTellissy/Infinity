import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, videoId, comment } = await req.json()

    const newComment = await db.videoComments.create({
      data: {
        userId,
        videoId,
        comment
      },
      select: {
        id: true,
        user: {
          select: {
            username: true,
            image: true
          }
        },
        comment: true,
        created_at: true
      }
    })

    return NextResponse.json(newComment, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}