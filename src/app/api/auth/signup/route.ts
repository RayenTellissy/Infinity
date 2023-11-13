import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

// db
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    return NextResponse.json({
      loggedIn: true,
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image
    }, { status: 200 })
  }
  catch(error: any){
    if(error.code === "P2002") return new NextResponse("USEREXISTS", { status: 400 })
    return new NextResponse("Internal Error", { status: 500 })
  }
}