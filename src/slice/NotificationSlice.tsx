import { createSlice } from '@reduxjs/toolkit';

interface Notification {
    message: string;
    date: string;
    type: 'admin' | 'user'; 
}

interface NotificationState {
    message: string | null;
    date: string | null;
    isOpen: boolean;
    notifications: Notification[]; 
}

const initialState: NotificationState = {
    message: null,
    date: null,
    isOpen: false,
    notifications: [
        // Admin side dummy data
        {
            message: "New appointment request from John Doe for 10:00 AM on Dec 10th.",
            date: "2024-12-08 09:00",
            type: "admin",
        },
        {
            message: "Meeting with Jane Smith confirmed for 2:00 PM on Dec 15th.",
            date: "2024-12-08 10:30",
            type: "admin",
        },

        // User side dummy data
        {
            message: "Your meeting with Dr. Alice Johnson has been confirmed for 3:00 PM on Dec 12th.",
            date: "2024-12-08 11:00",
            type: "user",
        },
        {
            message: "Your requested appointment for 11:00 AM on Dec 9th has been cancelled.",
            date: "2024-12-08 12:00",
            type: "user",
        },
    ],
};

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        toggleNotification: (state) => {
            state.isOpen = !state.isOpen;
        },

        setNotification: (state, action) => {
            const { message, type } = action.payload;
            state.notifications.push({
                message: message || "New notification",
                date: new Date().toLocaleString(),
                type: type || 'user',
            });
            state.isOpen = true;
        },

        clearNotification: (state) => {
            state.notifications = [];
            state.isOpen = false;
        },

        clearSingleNotification: (state, action) => {
            const index = action.payload;
            state.notifications.splice(index, 1);
            if (state.notifications.length === 0) {
                state.isOpen = false;
            }
        },
    },
});

export const { toggleNotification, setNotification, clearNotification, clearSingleNotification } = notifySlice.actions;
export default notifySlice.reducer;
