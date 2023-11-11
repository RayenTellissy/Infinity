import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { cookies } from "next/headers"

// constants
import { sevenDaysInSeconds } from "@/constants/constants";

// helpers
import { generateAccessToken, generateRefreshToken } from "@/helpers/GenerateTokens";

// db
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()
    const cookieStore = cookies()

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    const accessToken = generateAccessToken({ id: user.id })
    const refreshToken = generateRefreshToken({ id: user.id })
    // creating the http only cookies
    cookieStore.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30
    })
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: sevenDaysInSeconds
    })
    cookieStore.set({
      name: "id",
      value: user.id,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: sevenDaysInSeconds
    })

    return new NextResponse(JSON.stringify({
      loggedIn: true,
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image
    }), {
      status: 200
    })
  }
  catch(error: any){
    if(error.code === "P2002") return new NextResponse("USEREXISTS", { status: 400 })
    return new NextResponse("Internal Error", { status: 500 })
  }
}