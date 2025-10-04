import React from 'react'
import { useState,useEffect } from 'react'
import Loader from '../components/loader'
import { getAllBlog } from '../api/internal'
import styles from "../blogs.module.css";
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    (async function BlogCall() {
      const resp = await getAllBlog()
      if(resp.status === 201){
        setBlogs(resp?.data?.blogs)
      }       
    })();
    setBlogs([]);
  },[])

  if(blogs.length === 0){
    return <Loader text="Blogs Page" />
  }

  return (
    <div className={styles.blogsWrapper} >
      {
        blogs.map((blog)=>{
        return (
          <div id={blog._id} className={styles.blog} onClick={()=>navigate(`/blogs/${blog._id}`)}>
              <h1>{blog.title}</h1>
              <img src={blog.photo} alt="" />
              <p>{blog.content}</p>
          </div>
        )
        })
      }
    </div>
  )
}

export default Blog