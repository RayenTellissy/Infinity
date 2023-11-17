import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string
    username: string
    image: string | null
    email: string
  }
  interface Session {
    user: User,
    token: {
      id: string
      username: string
      image: string | null
      email: string
    }
  }
}