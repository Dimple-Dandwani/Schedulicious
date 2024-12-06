import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        toggleTheme: "light",
    },
    reducers: {
        toggleTheme: (state) => {
            state.toggleTheme = state.toggleTheme === "light" ? "dark" : "light"; 
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
