import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import chatSlice from "./chat-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, chat: chatSlice.reducer },
});

export default store;
