import axios from 'axios'

const api = axios.create({
  // iskay sath cookiess ko bhi communicate krwana hay hr request kay sath hmnay cookies ko bhi request ka part bnana hay 
  baseURL: import.meta.env.VITE_INTERNAL_API_PATH,
  withCredentials:true,
  headers: {
      "Content-Type":"application/json"
  }
})  

export const login = async(data) => {
    try{
      const response = await api.post("/login",data)
      return response;
    }
    catch(error){
      return error.response
    } 
}
export const signUp = async(data) => {
    try{
      const response = await api.post("/register",data)
      return response;
    }
    catch(error){
      return error.response
    } 
}
export const signOut = async () => {
  try{
    const response = await api.post("/logout")
    return response;
  }catch(error){
    return error.response
  }
}
export const getAllBlog = async () => {
  try{
    const response = await api.get("/blog/all")
    return response
  }catch(error){
    return error
  }
}
export const submitBlog = async (data) => {
  try{
      const resp = await api.post("/blog",data)
      console.log("Request Headers:", resp.config.headers);
      console.log("Cookies:", document.cookie);
      return resp;
  }catch(error){
    return error
  }
}
export const getBlogById = async (id) => {
  try{
    const resp = await api.get(`/blog/${id}`);
    return resp;
  }catch(error){
    return error;
  }
}
export const updateBlog = async(data) => {
  try{
    const resp = await api.put("/blog",data);
    return resp;
  }catch(error){
    return error;
  }
}
export const deleteBlog = async (id) => {
  try{
    const resp = await api.delete(`/blog/${id}`);
    return resp;
  }catch(error){
    return error
  }
}
export const commentData = async (data) => {
  try{  
    const resp = await api.post("/comment",data)
    return resp;
  }catch(error){
    return error;
  }
}
export const getCommentById = async (id) => {
  try{
    const resp = await api.get(`/comment/${id}`,{
      validateStatus:false  // ye 1 configuration option hay jo pass kra hay  --agar hmein koi comment nhi mila or backend say
      // 404 ka code arha hay tw hum is configuration say isko properly handle krskein
    });
    return resp
  }catch(error){
    return error;
  }
}

// Auto Token Refresh
// /protected-resource -> 401
// /refresh(endpoint) authenticated state --> generate new token 
// agar hmein 401 recieve hoga tw humm yha interceptor use kreingay jo automatically refresh walay endpoint par request krega
// phr hmaray pas new token generate hongay 

api.interceptors.response.use(
  config => config, //config hmein config hee return krta hay iskay through jo original request hay uska data wagerah milta hay
  async (error) => {
    const originalReq = error.config;
    if((error.response.status === 401 || error.response.status === 500) && originalReq && !originalReq._isRetry){
      originalReq._isRetry = true;
      try {
        await axios.get(`${import.meta.env.VITE_INTERNAL_API_PATH}/refresh`,{
          withCredentials:true
        })
        return api.request(originalReq)
      } catch (error) {
        return error;
      }
    } 
  }
)

// agar hamara access token expire hogya hay or hum koi protected route approach krna cha rha hein tw ohr usko login krna
// prega  and agar koi without token kay protected resource ko access krega tw ye isko 401 ka code dega 
// Easy Example
// Samjho tum login hue aur ek request bheji → token expire hogaya → server ne 401 Unauthorized bhej diya.
// Interceptor ne dekha 401 aya hai → refresh token API hit ki → new token mila → tumhari pehli request 
// dobara chalai → ab wo sahi chal gayi.
// Matlab:
// Ye code automatically token refresh system banata hai. Tumhe har dafa manually refresh karne ki zarurat nahi hoti.

// api.interceptors.response.use(...)
// Ye axios ka ek feature hai jo har response ko "intercept" krta hai, yani usko check kr leta hai before wo tumhari app ko mile.
// Agar response sahi aya → config => config simple return kr deta hai.
// Agar error aya:
// Error object ka andar error.config hota hai jo 
// original request ki puri info rakhta hai (kis URL pe hit kiya, kya body thi, headers wagera).