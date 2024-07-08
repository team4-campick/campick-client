import { configureStore } from "@reduxjs/toolkit";
import user from "./userStore";
import chat from "./chatStore";

export const store = configureStore({
  reducer: {
    user: user.reducer,
    chat: chat.reducer,
  },
});
