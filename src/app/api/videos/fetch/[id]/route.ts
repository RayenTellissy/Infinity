import { NextRequest, NextResponse } from "next/server";

// db
import db from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const video = await db.videos.findFirst({
      where: {
        id: params.id
      },
      select: {
        title: true,
        description: true,
        url: true,
        owner: true,
        created_at: true,
        comments: true
      }
    })

    const views = await db.videoViews.count({
      where: {
        videoId: params.id
      }
    })

    const likes = await db.videoLikes.count({
      where: {
        videoId: params.id
      }
    })

    return NextResponse.json({ ...video, views, likes }, { status: 200 })
  }
  catch(error){
    return NextResponse.json("Internal Error", { status: 500 })
  }
}