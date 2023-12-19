import { NextRequest, NextResponse } from "next/server";

// lib
import { getSession } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { userId, commentId, type } = await req.json()

    const interaction = await db.commentInteractions.findFirst({
      where: {
        userId,
        commentId
      },
      select: {
        id: true,
        type: true
      }
    })

    if(interaction && interaction.type === type) {
      await db.commentInteractions.delete({
        where: {
          id: interaction.id
        }
      })
      return new NextResponse("removed interaction",{ status: 200 })
    }
    else if(interaction && interaction.type !== type) {
      await db.commentInteractions.update({
        where: {
          id: interaction.id
        },
        data: {
          type
        }
      })
      return new NextResponse("updated interaction", { status: 200 })
    }

    await db.commentInteractions.create({
      data: {
        userId,
        commentId,
        type: "like"
      }
    })

    return new NextResponse("created interaction", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}