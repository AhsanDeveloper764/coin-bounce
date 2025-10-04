import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "../navbar.module.css"
import { useSelector } from 'react-redux';
import { signOut } from '../api/internal';
import { useDispatch } from 'react-redux'; //state ko update krnay ka liya hota hay 
import { resetUser } from '../store/userSlice';

function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.auth); // yha hum user kee state ko read kreingay
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await signOut();
    dispatch(resetUser())
  }

  return (
    <>
        <nav className={styles.navbar}>
            <NavLink className={styles.logo} to={"/"}>Coin Bounce</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/"}>Home</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/crypto"}>Crypto Currencies</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/blogs"}>Blogs</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/submitBlog"}>Submit a Blogs</NavLink>
            { isAuthenticated ? 
            <div><NavLink><button className={styles.signOutButton} onClick={()=>handleSignOut()} >Sign Out</button></NavLink></div>
            :
            <div>
                <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/login"}>
                <button className={styles.logInButton} >Log In</button>
                </NavLink>
                <NavLink className={({isActive}) => isActive ? styles.activeStyle : styles.InactiveStyle } to={"/signin"}>
                <button className={styles.signUpButton}>Sign In</button>
                </NavLink>
            </div>
            }
        </nav>
        <div className={styles.separator}></div>
    </>
  )
}

export default Navbar