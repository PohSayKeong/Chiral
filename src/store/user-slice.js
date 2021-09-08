import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { location: null },
    reducers: {
        setLocation(state, action) {
            state.location = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice;
