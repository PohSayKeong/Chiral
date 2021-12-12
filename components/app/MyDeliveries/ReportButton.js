import React, { useContext } from "react";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import { useDispatch } from "react-redux";

const ReportButton = (props) => {
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        web3Ctx.handleReported(props.data);
    };

    return (
        <Button type="button" color="primary" onClick={clickHandler}>
            Report
        </Button>
    );
};

export default ReportButton;
