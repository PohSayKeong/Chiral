import React, { useContext, Fragment } from "react";
import Button from "UI/CustomButtons/Button";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";
import Web3Context from "store/Web3-context";
import * as ga from "/lib/ga";

const OpenChatButton = (props) => {
    const dispatch = useDispatch();
    const web3Ctx = useContext(Web3Context);

    const openChat = () => {
        ga.event({ action: "open_chat" });
        dispatch(
            chatActions.setChat({ ...props.data, user: web3Ctx.userAccount })
        );
    };

    return (
        <Fragment>
            <Button type="button" color="info" onClick={openChat}>
                Open Chat
            </Button>
        </Fragment>
    );
};

export default OpenChatButton;
