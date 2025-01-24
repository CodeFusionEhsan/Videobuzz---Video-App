"use client"

// components/Navbar.js
import { useState } from 'react';
import styles from '../app/page.module.css';

const Navbar = () => {
    const[style, setStyle] = useState(styles.sidebar)
    const[search, setSearch] = useState("")

    const showsidebar = () => {
        if (style == styles.sidebar) {
            setStyle(styles.showsidebar)
        } else {
            setStyle(styles.sidebar)
        }
    }

    const Search_Func = (e) => {
        e.preventDefault()
        window.location = `/search/${search.replace(" ", "-")}`
      }

    return (
        <>
            <nav className={styles.navbar}>
                <div>
                    <h1 className={styles.logo}>Videobuzz</h1>
                </div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/trending'>Trending</a></li>
                    <li><a href='/latest'>Latest</a></li>
                    <li><a href='/upload'>Upload</a></li>
                    <li><a href='/yourvids'>Your Videos</a></li>
                </ul>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <input value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Type to Search...' />
                    <button onClick={Search_Func}>&rarr;</button>
                </form>
                <button onClick={showsidebar} className={styles.hamburger}>&equiv;</button>
            </nav>
            <div className={style}>
                <h1 className={styles.logo}>Videobuzz</h1>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <input value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Type to Search...' />
                    <button onClick={Search_Func}>&rarr;</button>
                </form>
                <ul>
                <li><a href='/'>Home</a></li>
                    <li><a href='/trending'>Trending</a></li>
                    <li><a href='/latest'>Latest</a></li>
                    <li><a href='/upload'>Upload</a></li>
                    <li><a href='/yourvids'>Your Videos</a></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;