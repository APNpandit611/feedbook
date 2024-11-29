import { createSlice } from "@reduxjs/toolkit";

const postUpdateSlice = createSlice({
    name: "postUpdate",
    initialState: {
        isEdited: false,
    },
    reducers:{
        setIsEdited:(state, action) => {
            state.loading = action.payload;
        }
    }
})

export const {setIsEdited} = postUpdateSlice.actions;
export default postUpdateSlice.reducer;

