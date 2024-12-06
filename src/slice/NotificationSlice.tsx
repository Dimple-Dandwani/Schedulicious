import { createSlice } from '@reduxjs/toolkit';

interface NotificationState {
    message: string | null;
    date: string | null;
    isOpen: boolean; 
}
const initialState: NotificationState = {
    message: null,
    date: null,
    isOpen: false,
};

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        toggleNotification: (state) => {
            state.isOpen = !state.isOpen;
        },
        setNotification: (state) => {
            state.message = "Request Accepted";
            state.date = new Date().toLocaleString();  
            state.isOpen = true;  
        },
        clearNotification: (state) => {
            state.message = null;
            state.date = null;
            state.isOpen = false;
        },
    },
});

export const { toggleNotification, setNotification, clearNotification } = notifySlice.actions;
export default notifySlice.reducer;
