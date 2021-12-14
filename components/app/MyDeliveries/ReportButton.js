import React, { useContext } from "react";
import Web3Context from "store/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import { useDispatch } from "react-redux";
import ReportWarningModal from "UI/Custom/Modals/ReportWarningModal";

const ReportButton = (props) => {
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        web3Ctx.handleReported(props.data);
    };

    return <ReportWarningModal clickHandler={clickHandler} />;
};

export default ReportButton;
