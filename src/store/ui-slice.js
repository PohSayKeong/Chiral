import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { notification: null, form: null, query: null },
    reducers: {
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
            };
        },
        saveForm(state, action) {
            if (action.payload.query) {
                state.query = action.payload.query;
                state.form = action.payload.data;
            } else {
                state.form = action.payload;
            }
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
