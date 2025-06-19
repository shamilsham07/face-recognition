import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isloader: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loader: (state, action) => {
      state.isloader = action.payload;
    },
  },
});

export const {
  loader,
} = authSlice.actions;

export default authSlice.reducer;