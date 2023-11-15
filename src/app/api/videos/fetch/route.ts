import { NextRequest, NextResponse } from "next/server";

// db
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const videos = await db.videos.findMany({
      include: {
        owner: true,
        VideoViews: true
      }
    })

    return NextResponse.json(videos, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}

// revalidating to show new data
export const revalidate = 1