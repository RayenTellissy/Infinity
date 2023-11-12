import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

// db
import { db } from "@/lib/db";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {}
      },
      async authorize(credentials) {
        if(!credentials?.username || !credentials?.password) return null

        const user = await db.users.findFirst({
          where: {
            username: credentials.username,
          }
        })
        if(!user) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if(!passwordMatch) return null

        return user
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        }
      }
    }
  }
}