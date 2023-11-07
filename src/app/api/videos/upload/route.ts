import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db"

type UploadRequest = {
  title: string
  description: string | null
  thumbnail: string
  duration: number
  visibility: "public" | "private"
  ownerId: string
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, thumbnail, duration, visibility, ownerId }: UploadRequest = await req.json()

    await prisma.videos.create({
      data: {
        title,
        description,
        thumbnail,
        duration,
        visibility,
        ownerId
      }
    })

    return NextResponse.json("Video Uploaded!", { status: 200 })
  }
  catch(error){
    return new NextResponse("Internal Error", { status: 500 })
  }
}