import { NextRequest, NextResponse } from "next/server";

// db
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const videos = await db.videos.findMany({})

    return NextResponse.json(videos, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}