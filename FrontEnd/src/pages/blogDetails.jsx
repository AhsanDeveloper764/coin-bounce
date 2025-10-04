import React,{ useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getBlogById,deleteBlog,commentData,getCommentById } from '../api/internal';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from "../detail.module.css";
import CommentList from '../components/commentList';
import Loader from "../components/loader"

const BlogDetails = () => {
  const [blogdetail,setblogDetail] = useState([]);
  const [comment,setComment] = useState([]);
  const [ownsBlog,setOwnsBlog] = useState(false);
  const [newComment,setNewComment] = useState("");
  const [reload,setReload] = useState(false);

  const params = useParams();
  const blogId = params.id;
  const navigate = useNavigate();

  const username = useSelector(state=>state.user.username);
  const userId = useSelector(state=>state.user._id);

  async function getBlogDetails() {
      const commentResponse = await getCommentById(blogId)
      if(commentResponse.status === 201){
        // ye phla wala data hmein axios say milta hay or dusra wala jo hay wo hmein backend say milta hay
        setComment(commentResponse.data.FindComment) 
      }

      const blogResponse = await getBlogById(blogId)
      if(blogResponse.status === 201){
        // set ownerShip
        setOwnsBlog(username === blogResponse.data.data.authorUsername)
        setblogDetail(blogResponse.data.data)
      }
    }

  useEffect(()=>{
    getBlogDetails();
  },[comment]) 
  
  const handleChange = (e) => {
    setNewComment(e.target.value)
  }
  // ahsan
  const postCommentHandler = async () => {
    const data = {
      author:userId,
      blog:blogId,
      content:newComment,
    }
    const resp = await commentData(data);
    if(resp.status === 201){
      setComment(resp.data.FindComment);
      setNewComment("");
    }
  }

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);
    if(response.status === 201){
      navigate("/blogs")
    }   
  }

  if(blogdetail.length === 0){
    return <Loader text="Blog Details" />
  }

  return <>
    <div className={styles.detailsWrapper} >
        <div className={styles.left}>
          <h1 className={styles.title}>{blogdetail.title}</h1>
          <div className={styles.meta} >
            <p>@{blogdetail.authorUsername + "on" + new Date(blogdetail.createdAt).toDateString()}</p>
          </div>
          <div className={styles.photo} >
            <img src={blogdetail.photo} alt="" width={250} height={250} />
          </div>
          <p className={styles.content} >{blogdetail.content}</p>
          {
            ownsBlog && (
              <div className={styles.controls} >
                <button className={styles.editButton} onClick={() => {navigate(`/update/${blogdetail._id}`)}} >Edit</button>
                <button className={styles.deleteButton} onClick={deleteBlogHandler} >Delete</button>
              </div>
            )
          }
        </div>
        <div className={styles.right}>
          <div className={styles.commentsWrapper}>
              <CommentList comments={comment}  />
              <div className={styles.postComment}>
                <input type="text" placeholder='comment goes here' value={newComment} onChange={handleChange} />
                <button className={styles.postCommentButton} onClick={postCommentHandler}>Post Comment</button>
              </div>
          </div>
        </div>
    </div>
  </>
}

export default BlogDetails; 