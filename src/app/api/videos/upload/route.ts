import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid"
import { prisma } from "@/lib/db"

type UploadRequest = {
  title: string
  description: string | null
  thumbnail: string
  duration: number
  visibility: "public" | "private"
  ownerId: string
  url: string
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, thumbnail, duration, visibility, ownerId, url }: UploadRequest = await req.json()

    const video = await prisma.videos.create({
      data: {
        id: nanoid(),
        title,
        description,
        thumbnail,
        duration,
        visibility,
        ownerId,
        url
      }
    })

    return NextResponse.json(video, { status: 200 })
  }
  catch(error){
    return NextResponse.json(error, { status: 500 })
  }
}