import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

// db
import db from "@/lib/db";

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
        if(!user) {
          throw new Error("INCUSR")
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password)
        if(!passwordMatch) {
          throw new Error("INCPWD")
        }

        return user
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {

      // image update received from the client
      if(trigger === "update" && session?.image) {
        token.image = session.image
      }

      if(user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          image: user.image
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          image: token.image as string,
          email: token.email as string
        }
      }
    }
  }
}

export const getSession = async () => {
  const session = await getServerSession(options)
  return session
}