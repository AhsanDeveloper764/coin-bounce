import React from 'react'
import styles from "../loader.module.css";
import { TailSpin } from 'react-loader-spinner';

const Loader = ({text}) => {
  return (
    <div className={styles.loaderWrapper}>
        <h2>Loading{text}</h2>
        <TailSpin
        height={80}
        width={80}
        radius={1}
        color={"#3861fb"} />
    </div>
  )
}

export default Loader;