import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import * as ga from "/lib/ga";

const RequestButton = (props) => {
    const [clicked, setClicked] = useState(false);
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();
    const viewData = useSelector((state) => state.request.viewData);

    const viewHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        // confirm button has been clicked
        if (viewData && viewData.index === props.data.index) {
            web3Ctx.handleAcceptRequest(props.data);
        } else {
            ga.event({ action: "show_available_request" });
        }
    };

    if (viewData) {
        // Another item is selected, reset current button
        if (viewData.index !== props.data.index && clicked === true) {
            setClicked(false);
        }

        // This item is selected, change button to selected state
        if (viewData.index === props.data.index && clicked === false) {
            setClicked(true);
        }
    }

    return (
        <Button
            type="button"
            color={clicked ? "primary" : "info"}
            onClick={viewHandler}
            disabled={parseInt(web3Ctx.userTokens) < parseInt(props.data.value)}
        >
            {clicked ? "confirm" : `${props.data.fees} Tokens`}
        </Button>
    );
};

export default RequestButton;
