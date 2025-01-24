"use server"

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import { env } from "process"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "Ov23liu8zVVjiNFEoppC",
      clientSecret: env.NEXTAUTH_SECRET,
    }),
    GoogleProvider({
        clientId: "102872295334-5jrotsdl19hitothra1tdrt9l86k4cuu.apps.googleusercontent.com",
        clientSecret: env.NEXTAUTH_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_URL
})

export {handler as GET, handler as POST}