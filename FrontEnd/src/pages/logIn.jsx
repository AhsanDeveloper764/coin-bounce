import React from 'react'
import { useState } from 'react';
import styles from "../login.module.css";
import TextInput from '../components/textInput';
import logInSchmea from '../schemas/loginSchema';
import { login } from '../api/internal';
import { useFormik } from 'formik';  // this is hook
import { setUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  // ye formik hmein property deta hay hum useformik ko use krtay hein form validaton kay liya 
  // touched ye btata hay kay humnay kisi field kay sath abhi interact kiya hay ya nhi ye error return jbhi krta hay 
  // touch ka event handle krnay ka liya use hoga handleBlur
  // handle change iskee help say formik hmari values ko change kreiga 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState("")
  const {values,touched,handleBlur,handleChange,errors} = useFormik({
    initialValues:{
      username:"",
      password:""
    },
    validationSchema:logInSchmea
  })

  const handlelogin = async () => {
     console.log("handlelogin chal gaya");
    const data = {
      username:values.username,
      password:values.password
    }
    const resp = await login(data)
    console.log("Login Response:", resp)

    if (resp?.status === 201) {
    console.log("Login success, navigating to home...");
    const user = {
      _id: resp.data.Data._id,
      email: resp.data.Data.email,
      username: resp.data.Data.username,
      auth: resp.data.auth
    }
    dispatch(setUser(user))
    navigate("/")
    } else {
      setError(resp?.data?.message)
      // apko kuch bhi access krna ho resp kay sath .data krkay ap apni koi bhi key access krsktay ho backend say 
    }

  }
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>Log in to your Account</div>
      {/* <form action=""> */}
      <TextInput type="text" value={values.username} name="username" onBlur={handleBlur} onChange={handleChange}
      placeholder="username" error={errors.username && touched.username ? 1 : undefined} errormessage={errors.username}  />
      <TextInput type="password" value={values.password} name="password" onBlur={handleBlur} onChange={handleChange}
      placeholder="Password" error={errors.password && touched.password ? 1 : undefined} errormessage={errors.password} />
      <button className={styles.logInButton} type='submit' onClick={handlelogin}
      disabled={!values.username || !values.password || errors.password || errors.username } >Log In</button>

      {/* </form> */}
      <span>
        Don't Have an Account?{" "} 
        <button className={styles.createAccount} onClick={()=>navigate("/signin")} >Register</button>
      </span>
      <div className={styles.errorMessage}>{error }</div>
    </div>
  )
}

export default LogIn;