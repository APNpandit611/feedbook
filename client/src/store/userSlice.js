import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        mode:null
    },
    reducers:{
        
        setLoading:(state, action) => {
            state.loading = action.payload
        },
        login:(state, action) => {
            state.user = action.payload.user;
            state.mode = action.payload.mode;
        },
        logout:(state) => {
            state.user = null;
        }
    }
})

export const {setLoading, login, logout, setMode} = userSlice.actions;
export default userSlice.reducer;