import { configureStore } from "@reduxjs/toolkit";
import login from "@/slice/LoginSlice";
import theme from "@/slice/ThemeSlice";
import notifySlice from '../slice/NotificationSlice';

const store = configureStore({
  reducer: {
    Login: login,
    theme: theme,
    notify: notifySlice,
  },
});

export default store;
