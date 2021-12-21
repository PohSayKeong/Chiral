import React, { useContext } from "react";
import Web3Context from "store/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import { useDispatch } from "react-redux";
import ReportWarningModal from "UI/Custom/Modals/ReportWarningModal";
import { makeStyles, Tooltip } from "@material-ui/core";
import tooltipsStyles from "styles/jss/material-kit-react/tooltipsStyle.js";

const useStyles = makeStyles(tooltipsStyles);

const ReportButton = (props) => {
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();
    const classes = useStyles();

    const clickHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        web3Ctx.handleReported(props.data);
    };

    return (
        <Tooltip
            title="Something went wrong with your delivery? Click this button to make a report."
            placement="top"
            classes={{ tooltip: classes.tooltip }}
            autoFocus
        >
            <ReportWarningModal clickHandler={clickHandler} />
        </Tooltip>
    );
};

export default ReportButton;
