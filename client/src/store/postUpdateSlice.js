import { createSlice } from "@reduxjs/toolkit";

const postUpdateSlice = createSlice({
    name: "postUpdate",
    initialState: {
        isEdited: false,
    },
    reducers: {
        setIsEdited: (state, action) => {
            state.isEdited = action.payload;
        },

        resetIsEdited: (state) => {
            state.isEdited = false;
        },
    },
});

export const { setIsEdited, resetIsEdited } = postUpdateSlice.actions;
export default postUpdateSlice.reducer;
