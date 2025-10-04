import React from 'react'
import { useState,useEffect } from 'react';
import { setUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const UseAutologin = () => {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    // IIFE ka funtion jab bnta hay jab funtion ko () ma rap krdo
    (async function AutoLoginApiCall() {
      try{
        const response = await axios.get(`${import.meta.env.VITE_INTERNAL_API_PATH}/refresh`,{
          withCredentials:true
        })
        // agar hmara resp jo hay wo successful hua tw hamari global state is if kay block ma update hojaha gee
        // or agar hamara resp shi nhi hay tw hamari state default same rhagee change nhi hogee 
        if (response?.status === 200) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth
          }
          dispatch(setUser(user))
        }
      }catch(error){
        console.log("Error Occured",error);
      }finally{
          setLoading(false)
      }
    })();
  },[])
    return loading;
}

export default UseAutologin; 