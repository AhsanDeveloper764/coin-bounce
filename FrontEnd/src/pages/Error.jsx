import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../error.module.css"

const Error = () => {
  return (
    <div className={styles.errorWrapper}>
        <h1 className={styles.errorHeader}>404 Page Not Found</h1>    
        <p className={styles.errorBody}>Go Back To <Link to={"/"} className={styles.homeLink}>Home</Link></p>
    </div>
  )
}

export default Error;