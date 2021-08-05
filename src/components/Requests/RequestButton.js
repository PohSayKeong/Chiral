import React, { useContext, useState } from "react";
import Button from "../../UI/CustomButtons/Button";
import Web3Context from "../../store/Web3-context";
import { chatActions } from "store/chat-slice";
import { useDispatch } from "react-redux";

const RequestButton = (props) => {
    const [buttonProps, setButtonProps] = useState({
        text: props.data.fees + " Tokens",
        color: "primary",
        clicked: false,
    });
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    const viewHandler = () => {
        props.view(props.data);
        dispatch(chatActions.setChat(null));
        // confirm button has been clicked
        if (buttonProps.clicked === true) {
            web3Ctx.handleAcceptRequest(props.data);
        }
    };

    // Another item is selected, reset current button
    if (props.clicked !== props.data && buttonProps.clicked === true) {
        setButtonProps({
            ...buttonProps,
            text: props.data.fees + " Tokens",
            color: "primary",
            clicked: false,
        });
    }

    // This item is selected, change button to selected state
    if (props.clicked === props.data && buttonProps.clicked === false) {
        setButtonProps({
            ...buttonProps,
            text: "Accept",
            color: "warning",
            clicked: true,
        });
    }

    return (
        <Button type="button" color={buttonProps.color} onClick={viewHandler}>
            {buttonProps.text}
        </Button>
    );
};

export default RequestButton;
