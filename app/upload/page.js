"use client"

import styles from "../page.module.css";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Upload() {
  const { data: session } = useSession()

  const[title, setTitle] = useState("")
  const[description, setDescription] = useState("")
  const[category, setCategory] = useState("")
  const[error, setError] = useState("")

  const videoupload = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById("filevid"); // Replace with your HTML element ID
    const file = fileInput.files[0];
    const formData = new FormData()
    formData.append("title", title)
    formData.append("id", session.user.email)
    formData.append("desc", description)
    formData.append("video", file)
    formData.append("category", category)

    console.log("fetching")

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    console.log("fetched")

    const jsres = await res.json()

    if (jsres.success == true) {
      window.location = "/"
    } else {
      setError("Error in uploading video")
    }
  }

  if(session) {
    return(
        <div className={styles.uploadpage}>
      <h3>{error}</h3>
      <h1>Upload A Video To Your Channel</h1>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <input value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Enter Video Title..." type="text"/>
        <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Enter Video Description..."></textarea>
        <input id="filevid" type="file"/>
        <input value={category} onChange={(e) => {setCategory(e.target.value)}} placeholder="Enter Video Category..." type="text" />
        <button onClick={videoupload}>Upload Video</button>
      </form>
    </div>
    )
  }

  return (
      <div className={styles.loginContainer}>
        <h1>Login To Videobuzz With Social Media</h1>
        <button onClick={signIn}>Sign In To Your Account</button>
      </div>
  );
}
