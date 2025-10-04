import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _id:"",
    email:"",
    username:"",
    auth:false
}
export const userSlice = createSlice({
    name:"user",  // ye user kee state hay iskee base par hum useSelector ma state manage krrha hein
    initialState:initialState, // yha par key value same hay
    reducers:{
        setUser:(state,action)=>{
            // backend say jo data ahaga wo ahaga action.payload mai or hum wha say ye fields destructure krrha hein
            const {_id,email,username,auth} = action.payload
            // yha state jo hay usmay current value mil rhi hay 
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.auth = action.payload.auth;
        },
        resetUser:(state,action)=>{
            state._id = "";
            state.email = "";
            state.username = "";
            state.auth = false;
        }
    }
})

export const {setUser,resetUser} = userSlice.actions;
export default userSlice.reducer;
