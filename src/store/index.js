import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import chatSlice from "./chat-slice";
import requestSlice from "./request-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        chat: chatSlice.reducer,
        request: requestSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
