import { NextRequest, NextResponse } from "next/server";

// lib
import { getSession } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { videoId: string } }) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const comments = await db.videoComments.findMany({
      where: {
        videoId: params.videoId
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
        created_at: true,
        CommentInteractions: {
          select: {
            type: true
          }
        },
        CommentReplies: {
          select: {
            id: true,
            user: true,
            reply: true,
            created_at: true
          }
        }
      }
    })

    return NextResponse.json(comments, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}