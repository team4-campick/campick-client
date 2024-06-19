import { configureStore } from '@reduxjs/toolkit';

import inquiry from './inquiryStore';
// import user from './userStore'

export const store = configureStore({
  reducer: {
    inquiry: inquiry.reducer,
  },
});
