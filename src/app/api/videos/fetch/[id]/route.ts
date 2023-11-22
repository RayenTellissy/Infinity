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
        id: true,
        title: true,
        description: true,
        url: true,
        owner: {
          select: {
            id: true,
            username: true,
            image: true
          }
        },
        created_at: true,
      }
    })

    if(!video) return new NextResponse("NOEXIST", { status: 404 })

    const subscribers = await db.subscribers.count({
      where: {
        subscribedId: video.owner.id
      }
    })

    const views = await db.videoViews.count({
      where: {
        videoId: params.id
      }
    })

    const likes = await db.videoInteractions.count({
      where: {
        videoId: params.id,
        type: "like"
      }
    })

    const dislikes = await db.videoInteractions.count({
      where: {
        videoId: params.id,
        type: "dislike"
      }
    })

    return NextResponse.json({ ...video, subscribers, views, likes, dislikes }, { status: 200 })
  }
  catch(error){
    return NextResponse.json("Internal Error", { status: 500 })
  }
}