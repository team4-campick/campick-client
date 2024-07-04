import { configureStore } from "@reduxjs/toolkit";

import inquiry from "./inquiryStore";
import user from "./userStore";
import chat from "./chatStore";

export const store = configureStore({
  reducer: {
    inquiry: inquiry.reducer,
    user: user.reducer,
    chat: chat.reducer,
  },
});
