import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if(!session) return new NextResponse("UNAUTHORIZED", { status: 401 })

    const { id, image } = await req.json()
    
    await db.users.update({
      where: {
        id
      },
      data: {
        image
      }
    })

    return new NextResponse("image updated.", { status: 200 })
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}