import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
    postInfo: postReducer,
  },
});
