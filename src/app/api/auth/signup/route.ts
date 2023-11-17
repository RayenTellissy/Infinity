import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

// db
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()

    const userExists = await db.users.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if(userExists) {
      if(userExists.username === username) return new NextResponse("USEREXISTS", { status: 409 })
      else if(userExists.email === email) return new NextResponse("EMAILEXISTS", { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.users.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    return new NextResponse("Signed up!", { status: 200 })
  }
  catch(error: any){
    return new NextResponse("Internal Error", { status: 500 })
  }
}