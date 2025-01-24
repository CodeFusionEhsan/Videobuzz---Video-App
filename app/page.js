"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  const[videos, setVideos] = useState([])

  console.log(session)

  const fetchvideos = async () => {
    const result = await fetch('/api/fetchvideos', {
      method: "GET"
    })

    const jsres = await result.json()

    console.log(jsres)

    setVideos(jsres.result)
  }

  useEffect(() => {
    fetchvideos()
  }, [])

  if (session) {
    return (
      <div className={styles.homepage}>
      <div className={styles.container}>
        {videos.length > 0 ?
          videos.map((video) => {
            return(
            <div key={video._id}>
              <video className={styles.videocontainer} onClick={() => {window.location=`/video/${video._id}`}} height="240" width="320" controls>
                <source src={`/videos/${video.video}`} type="video/mp4">
                
                </source>
              </video>
              <h1 onClick={() => {window.location=`/video/${video._id}`}} className={styles.titlevid}>{video.title.slice(0, 40) + "..."}</h1>
              <h3 className={styles.desc}>{video.uploaded_at}</h3>
              <hr />
            </div>
            )
          }) 
        : <h1>No Videos Found!</h1>}
      </div>
    </div>
    );
  }

  return(
    <div className={styles.loading}>
      <img src="loading.gif"/>
    <div className={styles.loginContainer}>
        <h1>Login To Videobuzz With Social Media</h1>
        <button onClick={signIn}>Sign In To Your Account</button>
      </div>
    </div>
  )
}
