import React from 'react';
import { useState,useEffect } from 'react';
import { submitBlog } from '../api/internal';
import styles from "../submit.module.css";
import { useSelector } from 'react-redux';
import TextInput from '../components/textInput';
import { useNavigate } from 'react-router-dom';

function SubmitBlogs() {
  const author = useSelector( state => state.user._id)
  const navigate = useNavigate()
  const [input,setInput] = useState({
    title:"",
    content:"",
    photo:"",
    author:""
  })
  const handleChange = (e) => {
    setInput({...input,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    setInput((prev) =>({...prev,author:author}))
  },[author])

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInput((prev)=>({...prev, photo:reader.result}))
    }  
  }

  const submitHandler = async () => {
    const data = {
      author:input.author,
      title:input.title,
      content:input.content,
      photo:input.photo
    }

    const resp = await submitBlog(data)
    if(resp?.status === 201){
      console.log("chal gya",input);      
      navigate("/")
    }
  }


   
  return (
    <div className={styles.wrapper}> 
        <h1 className={styles.header} >Create a Blog</h1>
        <TextInput
          type="text"
          placeholder="title"
          name="title"
          value={input.title}
          onChange={handleChange}
          style={{width:'60%'}}
        />
        <textarea name="content" id="" className={styles.content} placeholder='your content' maxLength={400}
        value={input.content} onChange={handleChange}  />
        <div className={styles.photoPrompt}>
          <p>Choose a Photo</p>
          <input type="file" name='photo' id='photo' accept='image/jpg , image/jpeg , image/png'
          onChange={getPhoto} />
        </div>
        <button className={styles.submit} onClick={submitHandler} disabled={input.title===""
          || input.content==="" || input.photo===""
        }>Submit</button>
      </div>
  )
}

export default SubmitBlogs



// 1. Target kya hai?
// e = event object (jo input change pe milta hai).
// e.target = wo element jahan se event trigger hua (yani tumhara <input type="file" />).
// Is input ke andar ek property hoti hai files (plural).
// 2. Zero [0] kyu likhte hain?
// e.target.files ek array-like object hota hai (FileList).
// User ek ya multiple files select kar sakta hai.
// [0] ka matlab hai → pehli (first) selected file ko lena.