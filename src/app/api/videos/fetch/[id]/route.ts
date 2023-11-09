import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const video = await prisma.videos.findFirst({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(video, { status: 200 })
  }
  catch(error){
    return NextResponse.json("Internal Error", { status: 500 })
  }
}