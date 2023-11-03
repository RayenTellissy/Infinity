import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

// constants
import { primsaUserSafeDetails } from "@/constants/constants"

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const cookie = cookieStore.get("id")

    if(!cookie?.value) return new NextResponse("No Id.", { status: 401 })

    const user = await prisma.users.findFirst({
      where: {
        id: cookie?.value
      },
      select: {
        ...primsaUserSafeDetails
      }
    })

    return new NextResponse(JSON.stringify({ loggedIn: true, ...user }), { status: 200 })
  }
  catch(error){
    return new NextResponse("Internal Error", { status: 500 })
  }
}