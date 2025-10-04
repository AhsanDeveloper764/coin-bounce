import React from 'react'
import styles from "../comment.module.css";

const Comment = ({comments}) => {
  const date = new Date(comments.createdAt).toDateString();
  return (
    <div className={styles.comment}>
        <div className={styles.header}>
            <div className={styles.author}>{comments.authorUsername}</div>
            <div className={styles.date}>{date}</div>
            <div className={styles.commentText}>{comments.content}</div>
        </div>
    </div>
  )
}

export default Comment;