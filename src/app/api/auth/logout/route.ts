import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()

    // deleting all httpOnly Cookies used for authentication
    cookieStore.delete("id")
    cookieStore.delete("refreshToken")
    cookieStore.delete("accessToken")
    
    return new NextResponse("Logged out.", { status: 200 })
  }
  catch(error){
    return new NextResponse("Internal Error", { status: 500 })
  }
}