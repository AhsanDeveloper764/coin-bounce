import React from 'react'
import styles from "../commentlist.module.css"
import Comment from './comment'

const CommentList = ({comments}) => {
  return (
    <div className={styles.CommentListWrapper}>
      <div className={styles.commentList} >
      {
          comments.length === 0 ? 
        (
        <div>
          <p className={styles.noComments}>No Comments Posted</p>
        </div>
        ) : 
        comments.map((comment)=>{
            return <Comment key={comment._id} comments={comment} />
        })
      }
      </div>
    </div>
  )
}

export default CommentList;