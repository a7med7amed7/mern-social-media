import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    user: null,
    visible: false,
  },
  reducers: {
    clicked: (state, action) => {
      state.visible = !state.visible;
      state.user = action.payload;
    },
  },
});

export const { clicked } = postSlice.actions;
export default postSlice.reducer;
