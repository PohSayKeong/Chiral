import React from "react";
import { Button } from "@material-ui/core";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";

const CloseChatButton = () => {
    const dispatch = useDispatch();
    const closeChat = () => {
        dispatch(chatActions.setChat(null));
    };
    return (
        <Button
            style={{ backgroundColor: "#FCFCFC", borderRadius: 0 }}
            onClick={closeChat}
        >
            X
        </Button>
    );
};

export default CloseChatButton;
