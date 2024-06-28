import { createSlice } from "@reduxjs/toolkit";

const inquiry = createSlice({
  name: "inquiry",
  initialState: {
    inquiry: null,
  },
  reducers: {
    setInquiryAllInfo: (state, action) => {
      state.inquiry = action.payload;
    },
  },
});
export const { setInquiryAllInfo } = inquiry.actions;
export default inquiry;
