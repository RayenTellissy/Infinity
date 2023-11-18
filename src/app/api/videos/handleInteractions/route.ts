import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, videoId, type } = await req.json()

    const interaction = await db.videoInteractions.findFirst({
      where: {
        userId,
        videoId
      },
      select: {
        id: true,
        type: true
      }
    })

    // remove the interaction
    if(interaction && interaction.type === type) {
      await db.videoInteractions.delete({
        where: {
          id: interaction.id
        }
      })
      return new NextResponse("removed interaction",{ status: 200 })
    }
    else if(interaction && interaction.type !== type) {
      await db.videoInteractions.update({
        where: {
          id: interaction.id
        },
        data: {
          type
        }
      })
      return new NextResponse("updated interaction", { status: 200 })
    }

    await db.videoInteractions.create({
      data: {
        userId,
        videoId,
        type
      }
    })

    return new NextResponse("added interaction", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}