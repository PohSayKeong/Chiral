import React, { useContext, Fragment } from "react";
import Button from "UI/CustomButtons/Button";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";
import Web3Context from "store/Web3-context";

const OpenChatButton = (props) => {
    const dispatch = useDispatch();
    const web3Ctx = useContext(Web3Context);

    const openChat = () => {
        dispatch(
            chatActions.setChat({ ...props.data, user: web3Ctx.userAccount })
        );
    };

    return (
        <Fragment>
            <Button type="button" color="primary" onClick={openChat}>
                Open Chat
            </Button>
        </Fragment>
    );
};

export default OpenChatButton;
