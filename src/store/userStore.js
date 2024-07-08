import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUserAllInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUserAllInfo } = user.actions;
export default user;
