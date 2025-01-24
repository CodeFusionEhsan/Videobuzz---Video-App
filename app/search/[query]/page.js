"use client"

import styles from '../../page.module.css'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Page({ params }) {
    const { data: session } = useSession()

    const[videos, setVideos] = useState([])
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState("")
    const[liketext, setLiketext] = useState("Like Video!")
    const[search, setSearch] = useState("")

    const headset = async () => {
        const searchquery = (await params).query
        setSearch(searchquery)
        console.log(search)
    }
    
    const fetchVideos = async () => {
        const slug = (await params).query
        const formData = new FormData()
        formData.append("query", slug)

        const res = await fetch('/api/search', {
            method: "POST",
            body: formData
        })

        const jsres = await res.json()

        if(jsres) {
            setLoading(false)
            const arr = jsres.result
            setVideos(arr)
        } else {
            setLoading(false)
            setError("Internal Server Error!")
        }
    }

    useEffect(() => {
        headset()
        fetchVideos()
    }, [])

    console.log(videos)

    if (session) {
        return(
            <div className={styles.homepage2}>
        {loading? 
        <h1 className={styles.loading}>Loading...</h1>
        : <div>
            <div><h1>{error}</h1></div>
            <div><h2 className={styles.headingsearch}>Showing Search Results For - "{search.replace("%20", " ")}"</h2></div>
            <div className={styles.container}>
            {videos.length > 0 ?
          videos.map((video) => {
            return(
            <div key={video._id}>
              <video onClick={() => {window.location=`/video/${video._id}`}} height="240" width="320" controls>
                <source src={`/videos/${video.video}`} type="video/mp4">
                
                </source>
              </video>
              <h1 onClick={() => {window.location=`/video/${video._id}`}} className={styles.titlevid}>{video.title.slice(0, 40) + "..."}</h1>
              <h3 className={styles.desc}>{video.uploaded_at}</h3>
            </div>
            )
          }) 
        : <h1>No Videos Found!</h1>}
            </div>

        </div>}
    </div>
        )
    }

    return (
        <div className={styles.loading}>
        <img src="/loading.gif"/>
        <div className={styles.loginContainer}>
        <h1>Login To Videobuzz With Social Media</h1>
        <button onClick={signIn}>Sign In To Your Account</button>
      </div>
      </div>
    )
}
