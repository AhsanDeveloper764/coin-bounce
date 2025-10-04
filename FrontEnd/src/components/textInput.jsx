import React from 'react'
import styles from "../textInput.module.css"

const TextInput = (props) => {
  return (
    <div className={styles.textInputWrapper} >
        <input {...props} />
        {props.error && <p className={styles.errorMessage} >{props.errormessage}</p> }
    </div>
  )
}

export default TextInput;