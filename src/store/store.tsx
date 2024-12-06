import { configureStore } from "@reduxjs/toolkit";
import login from "@/slice/LoginSlice";
import theme from "@/slice/ThemeSlice";

const store = configureStore({
  reducer: {
    Login: login,
    theme: theme,
  },
});

export default store;
