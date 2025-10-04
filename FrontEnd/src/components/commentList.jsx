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
        comments.map((comment,i)=>{
            return (
            <div key={i} >
              <Comment comments={comment} />
            </div>
            )
        })
      }
      </div>
    </div>
  )
}

export default CommentList;