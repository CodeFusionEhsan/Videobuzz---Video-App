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
      clientSecret: process.env.GIT_SECRET,
    }),
    GoogleProvider({
        clientId: "102872295334-5jrotsdl19hitothra1tdrt9l86k4cuu.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET
})

export {handler as GET, handler as POST}
