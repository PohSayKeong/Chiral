import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: { chatInfo: null, client: null },
    reducers: {
        setChat(state, action) {
            state.chatInfo = action.payload;
        },
    },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
