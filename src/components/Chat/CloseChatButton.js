import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";

const CloseChatButton = () => {
    const dispatch = useDispatch();

    const closeChat = async () => {
        dispatch(chatActions.setChat(null));
    };

    return (
        <Fragment>
            <Button
                style={{
                    backgroundColor: "#FCFCFC",
                    borderRadius: 0,
                    height: "100%",
                }}
                onClick={closeChat}
            >
                X
            </Button>
        </Fragment>
    );
};

export default CloseChatButton;
