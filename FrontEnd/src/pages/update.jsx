import React, { useEffect, useState } from 'react'
import { getBlogById } from '../api/internal';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateBlog } from '../api/internal'; 
import TextInput from '../components/textInput';
import styles from "../update.module.css"

const Update = () => {
  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id; 
  
  const [input,setInput] = useState({
    title:"",
    content:"",
    photo:"",
    author:""
  })
  useEffect(()=>{
    async function getBlogDetails(){
        const response = await getBlogById(blogId);
        if(response.status === 201){
            setInput({
            title: response.data.data.title,
            content: response.data.data.content,
            photo: response.data.data.photo,
            author: response.data.data.author, // agar backend se mil raha ho
            blogId: response.data.data._id,
      });
        }
    }getBlogDetails();
  },[]) // empty dependency denay ka mtlb page jab mount hoga jab useEffect ka kam perform hoga agar kisi 1 cheez par depend hay tw
  // jab mount hoga jab wo change ho
    const handleChange = (e) => {
      setInput({...input,[e.target.name]:e.target.value})
    }
  
    // useEffect(()=>{
    //   setInput((prev) =>({...prev,author:author}))
    // },[author])
  
    const getPhoto = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInput((prev)=>({...prev, photo:reader.result}))
      }  
    }
    const author = useSelector(state => state.user._id)
    useEffect(()=>{
        setInput((prev) =>({...prev,author:author}))
    },[author])


    const updateHandler = async () => {

      // http:backend_server:port/storage/filename.png
      // base64
      let data;
      if(input.photo.includes("http")){
        data = {
            author:input.author,
            title:input.title,
            content:input.content,
            blogId:input.blogId
        }
      }else{
        data = {
            author:input.author,
            title:input.title,
            content:input.content,
            blogId:input.blogId,
            photo:input.photo
        }
      }
      const resp = await updateBlog(data)   
          if(resp?.status === 201){
            console.log("chal gya",input);      
            navigate("/")
      }
    }


  return (
        <div className={styles.updatewrapper}> 
        <h1 className={styles.updateheader} >Edit your Blog</h1>
        <TextInput
          type="text"
          placeholder="title"
          name="title"
          value={input.title}
          onChange={handleChange}
          style={{width:'60%'}}
        />
        <textarea name="content" id="" className={styles.updatecontent} placeholder='your content' maxLength={400}
        value={input.content} onChange={handleChange}  />
        <div className={styles.updatephotoPrompt}>
          <p>Choose a Photo</p>
          <input type="file" name='photo' id='photo' accept='image/jpg , image/jpeg , image/png'
          onChange={getPhoto} />
        </div>
        <button className={styles.updatesubmit} onClick={updateHandler}>Submit</button>
      </div>
  )
}

export default Update;