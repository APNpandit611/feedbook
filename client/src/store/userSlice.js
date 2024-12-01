import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        mode: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.mode = action.payload.mode;
        },
        logout: (state) => {
            state.user = null;
            state.mode = null;
        },
    },
});

export const { login, logout, setMode } = userSlice.actions;
export default userSlice.reducer;
