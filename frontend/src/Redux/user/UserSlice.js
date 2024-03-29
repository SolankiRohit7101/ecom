import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupFail, signupStart, signupSuccess } = userSlice.actions;

export default userSlice.reducer;
