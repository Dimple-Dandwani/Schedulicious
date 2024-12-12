import { configureStore } from "@reduxjs/toolkit";
import login from "@/slice/LoginSlice";
import theme from "@/slice/ThemeSlice";
import notifySlice from '@/slice/NotificationSlice';
import bookingReducer from '@/slice/BookingSlice';

const store = configureStore({
  reducer: {
    Login: login,
    theme: theme,
    notify: notifySlice,
    booking: bookingReducer, 
  },
});

export default store;
