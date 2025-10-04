import React,{ useState } from 'react'
import SignUpSchema from '../schemas/signupSchema'
import styles from "../signup.module.css";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TextInput from '../components/textInput';
import { setUser } from '../store/userSlice';
import { signUp } from '../api/internal';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = useState("");

  const {values,touched,handleBlur,handleChange,errors} = useFormik({
    initialValues : {
      name:"",
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    },
    validationSchema:SignUpSchema
  })
  const handleSignUp = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      // ye jo key hein ye backend kee schema say same hona chaiye
    }
    console.log("Sending signup data:", data);
    const resp = await signUp(data);
    console.log("Server response:", resp);
    if(resp?.status === 200){
      // set user kay through apni state ko update krna hay
      console.log("Login success, navigating to home...");
      const user = {
        _id: resp.data.Data._id,
        email: resp.data.Data.email,
        username: resp.data.Data.username,
        auth: resp.data.auth
      }
      // redirect homepage 
      dispatch(setUser(user))
      navigate("/")
    }else {
      setError(resp?.data?.message)
    }
    
  }

  return (
    <div className={styles.signupWrapper}>
        <div className={styles.signupHeader}>
          <p>Create an Account</p>
        </div>
        <TextInput type="text" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="name"
        error={errors.name && touched.name ? 1 : undefined} errormessage={errors.name}  />

        <TextInput type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder="username"
        error={errors.username && touched.username ? 1 : undefined} errormessage={errors.username} />

        <TextInput type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="email"
        error={errors.email && touched.email ? 1 : undefined} errormessage={errors.email} />

        <TextInput type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} 
        placeholder="password" error={errors.password && touched.password ? 1 : undefined} errormessage={errors.password} />
        
        <TextInput type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} 
        onBlur={handleBlur} placeholder="Confirm Password" error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined} 
        errormessage={errors.confirmPassword} />

        <button className={styles.signupButton} onClick={handleSignUp}
        disabled={!values.name || !values.username || !values.email || !values.password || !values.confirmPassword
          || errors.name || errors.username || errors.email || errors.password || errors.confirmPassword
        }>Sign Up</button>
        <span>Already Have an Account <button className={styles.login} onClick={()=>navigate("/login")} >Log in</button> </span>
        {/* <div className={styles.errorMessage}>{error}</div> */}
    </div>
  )
}

export default SignIn;