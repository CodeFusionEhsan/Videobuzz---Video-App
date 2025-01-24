"use client"

import Image from "next/image";
import styles from "../page.module.css";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    window.location = "/"
  }
  return (
    <div className={styles.page}>
      <div className={styles.loginContainer}>
        <h1>Login To Videobuzz With Social Media</h1>
        <button onClick={signIn}>Sign In To Your Account</button>
      </div>
    </div>
  )
}
