"use client"

import styles from '../../page.module.css'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Page({ params }) {
    const { data: session } = useSession()

    const[video, setVideo] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState("")
    const[liketext, setLiketext] = useState("Like Video!")
    
    const fetchVideo = async () => {
        const slug = (await params).id
        const formData = new FormData()
        formData.append("id", slug)

        const res = await fetch('/api/fetchvideo', {
            method: "POST",
            body: formData
        })

        const jsres = await res.json()

        if(jsres) {
            setLoading(false)
            const arr = []
            arr.push(jsres.result)
            setVideo(arr)
        } else {
            setLoading(false)
            setError("Internal Server Error!")
        }
    }

    const likevideo = async () => {
        const slug = (await params).id
        const formData = new FormData()
        formData.append("id", slug)
        formData.append('likedby', session.user.email)

        const res = await fetch('/api/likevideo', {
            method: "POST",
            body: formData
        })

        const jsres = await res.json()

        if(jsres.success == true) {
            setLiketext("Liked!")
        } else {
            setError("Internal Server Error!")
        }
    }

    useEffect(() => {
        fetchVideo()
    }, [])

    if (session) {
        return(
            <div className={styles.homepage2}>
        {loading? 
        
<div className={styles.loading}>
      <img src="loading.gif"/>
    </div>
        : <div>
            <div><h1>{error}</h1></div>
            <div>
            <video className={styles.zoomvid}  height="500" width="1065" controls>
                <source src={`/videos/${video[0].video}`} type="video/mp4">
                
                </source>
              </video>
              <h1 className={styles.titlevid2}>{video[0].title}</h1>
              <h3 className={styles.desc2}>Uploaded At - {video[0].uploaded_at}</h3>
              <h3 className={styles.desc2}>Likes - {video[0].likes.length}</h3>
              <button onClick={likevideo} className={styles.vidbtn}>{liketext}</button>
              <h3 className={styles.videsctitle}>Video Description</h3>
              <p className={styles.videodesc}>{video[0].description}</p>
            </div>

        </div>}
    </div>
        )
    }

    return (
        <div className={styles.loginContainer}>
        <h1>Login To Videobuzz With Social Media</h1>
        <button onClick={signIn}>Sign In To Your Account</button>
      </div>
    )
}
