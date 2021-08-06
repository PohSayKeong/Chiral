import React, { useContext, Fragment } from "react";
import Button from "UI/CustomButtons/Button";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";
import Web3Context from "store/Web3-context";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const OpenChatButton = (props) => {
    const dispatch = useDispatch();
    const web3Ctx = useContext(Web3Context);
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const openChat = () => {
        dispatch(
            chatActions.setChat({ ...props.data, user: web3Ctx.userAccount })
        );
    };

    const button = (
        <Button type="button" color="primary" onClick={openChat}>
            Open Chat
        </Button>
    );
    return (
        <Fragment>
            {isDesktopOrLaptop ? (
                button
            ) : (
                <NavLink to="/chat" style={{ textDecoration: "none" }}>
                    {button}
                </NavLink>
            )}
        </Fragment>
    );
};

export default OpenChatButton;
