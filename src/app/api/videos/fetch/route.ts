import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const videos = await db.videos.findMany()

    return NextResponse.json(videos, { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}