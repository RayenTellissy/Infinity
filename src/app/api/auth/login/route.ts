import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import bcrypt from "bcrypt"

// constants
import { sevenDaysInSeconds } from "@/constants/constants";

// helpers
import { generateAccessToken, generateRefreshToken } from "@/helpers/GenerateTokens";

// db
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    const cookieStore = cookies()

    const user = await db.users.findFirst({
      where: {
        username
      }
    })

    // if user doesn't exist
    if(!user) return new NextResponse(JSON.stringify({ message: "User not found.", code: "NOEXIST" }), {
      status: 401
    })

    const loggedUser = await bcrypt.compare(password, user.password)

    // if the password is incorrect
    if(!loggedUser) return new NextResponse(JSON.stringify({ message: "Incorrect Password.", code: "INCPWD" }), {
      status: 401
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
  catch(error){
    return new NextResponse("Internal Error", { status: 500 })
  }
}