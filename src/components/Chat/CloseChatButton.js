import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const CloseChatButton = () => {
    const dispatch = useDispatch();
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const closeChat = async () => {
        dispatch(chatActions.setChat(null));
    };

    const button = (
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
    );
    return (
        <Fragment>
            {isDesktopOrLaptop ? (
                button
            ) : (
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    {button}
                </NavLink>
            )}
        </Fragment>
    );
};

export default CloseChatButton;
