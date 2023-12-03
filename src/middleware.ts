export { default } from "next-auth/middleware"

export const config = { matcher: [
  "/dashboard",
  "/subscriptions",
  "/watchlater",
  "/channel/:path*",
  "/upload",
  "/settings"
]}