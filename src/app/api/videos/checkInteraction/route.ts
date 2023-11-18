import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, videoId } = await req.json()

    const interaction = await db.videoInteractions.findFirst({
      where: {
        userId,
        videoId
      },
      select: {
        type: true
      }
    })

    if(interaction) {
      return new NextResponse(interaction.type === "like" ? "liked" : "disliked", { status: 200 })
    }

    return new NextResponse("none", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}