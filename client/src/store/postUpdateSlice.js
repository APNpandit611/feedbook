import { createSlice } from "@reduxjs/toolkit";

const postUpdateSlice = createSlice({
    name: "postUpdate",
    initialState: {
        editedItem: [],
    },
    reducers: {
        setEditedItem: (state, action) => {
            state.editedItem = [...state.editedItem, action.payload];
        },
    },
});

export const { setEditedItem } = postUpdateSlice.actions;
export default postUpdateSlice.reducer;
