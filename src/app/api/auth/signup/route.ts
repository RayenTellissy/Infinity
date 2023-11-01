import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return new NextResponse(req.body)
  }
  catch(error){
    return new NextResponse("Internal Error", { status: 500 })
  }
}