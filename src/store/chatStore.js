import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    selectedConversation: null,
    selectedReceiverNickname: null,
    messages: [],
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setSelectedReceiverNickname: (state, action) => {
      state.selectedReceiverNickname = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setSelectedConversation,
  setSelectedReceiverNickname,
  setMessages,
} = chat.actions;

export default chat;
