import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
    user: userReducer,   // yaha "user" hi hona chahiye
  },
})

export default store;