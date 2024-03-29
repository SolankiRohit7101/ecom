import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Redux/user/UserSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
