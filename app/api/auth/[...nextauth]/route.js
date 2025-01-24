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
      clientSecret: "cee87be3d11a22e45a2281be7451acc8c1dc35a4",
    }),
    GoogleProvider({
        clientId: "102872295334-5jrotsdl19hitothra1tdrt9l86k4cuu.apps.googleusercontent.com",
        clientSecret: "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",
    }),
  ],
  secret: "73f8d9b1-e456-42cf-9a32-af72bfc6c7e0_XzJyb3p6YnVtcF8yNk5vczY3NjA3NTQjISQy"
})

export {handler as GET, handler as POST}
