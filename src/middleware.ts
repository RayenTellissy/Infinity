import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value
  const accessToken = cookieStore.get("accessToken")?.value
  const id = cookieStore.get("id")?.value

  if(!process.env.JWT_REFRESH_SECRET || !process.env.JWT_ACCESS_SECRET) throw new Error("ENV ERROR.") // in case of missing env variables.
  if((!refreshToken && id) || (refreshToken && !id)) {
    cookieStore.delete("refreshToken")
    cookieStore.delete("accessToken")
    cookieStore.delete("id")
  }
  if(!refreshToken || !id) return // not authenticated, we let the user use the website unauthenticated

  try {
    const verifiedRefresh = await jwtVerify(refreshToken, new TextEncoder().encode(process.env.JWT_REFRESH_SECRET))
    if(verifiedRefresh.payload.id !== id) {
      cookieStore.delete("refreshToken")
      cookieStore.delete("accessToken")
      cookieStore.delete("id")
    }
  }
  catch(error){
    // invalid refresh Token
    return new NextResponse(JSON.stringify(error))
  }

  try {
    // verifying access token
    const verifiedAccess = await jwtVerify(accessToken as string, new TextEncoder().encode(process.env.JWT_ACCESS_SECRET))
  }
  catch(error){
    const newToken = await new SignJWT({ id: "123" })
    .setProtectedHeader({ alg: "HS256"})
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("30s")
    .sign(new TextEncoder().encode(process.env.JWT_ACCESS_SECRET))
    //! this won't work
    cookieStore.set({
      name: "accessToken",
      value: newToken,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30
    })
  }
}

// export const config = {
//   matchers: "/"
// }