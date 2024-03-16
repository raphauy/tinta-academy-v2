import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type GetServerSidePropsContext } from "next"
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "./db"
import GoogleProvider from "next-auth/providers/google"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({     
      ...session,
      user: {
        ...session.user,
        id: user.id,
        //@ts-ignore
        role: user.role,
        //@ts-ignore
        handle: user.handle,
        //@ts-ignore
        bio: user.bio,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER || 'http://localhost:3000',
        port: process.env.EMAIL_PORT || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD || "",
        },
        from: process.env.EMAIL_FROM
      },
      from: process.env.EMAIL_FROM || "default@default.com",
      ... (process.env.NODE_ENV !== "production"
      ? {
          sendVerificationRequest({ url }) {
            console.log("LOGIN LINK", url);
          },
        }
      : {}),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),

  ],
  pages: {
    signIn: "/login",
    signOut: "/logout"
  }
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}


export default async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session= await getSession()
  if (!session) return null
  
  const { user } = session

  return user;
  
}
