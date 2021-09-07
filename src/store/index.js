import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import chatSlice from "./chat-slice";
import requestSlice from "./request-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        chat: chatSlice.reducer,
        request: requestSlice.reducer,
    },
});

export default store;
