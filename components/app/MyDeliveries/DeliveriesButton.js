import React, { useContext } from "react";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import { useDispatch } from "react-redux";

const DeliveriesButton = (props) => {
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        if (
            web3Ctx.userAccount === props.data.pickupAddress &&
            props.data.step === "2"
        ) {
            web3Ctx.handleReceived(props.data);
        } else if (
            web3Ctx.userAccount === props.data.courierAddress &&
            props.data.step === "1"
        ) {
            web3Ctx.handleDelivered(props.data);
        } else if (
            web3Ctx.userAccount === props.data.pickupAddress &&
            props.data.step === "0"
        ) {
            web3Ctx.handleCancelled(props.data);
        }
    };

    return (
        <Button type="button" color="primary" onClick={clickHandler}>
            {web3Ctx.userAccount === props.data.pickupAddress &&
                props.data.step === "0" &&
                "Cancel"}
            {web3Ctx.userAccount === props.data.pickupAddress &&
                props.data.step === "1" &&
                "Delivering"}
            {web3Ctx.userAccount === props.data.pickupAddress &&
                props.data.step === "2" &&
                "Received"}
            {web3Ctx.userAccount === props.data.courierAddress &&
                props.data.step === "1" &&
                "Delivered"}
            {web3Ctx.userAccount === props.data.courierAddress &&
                props.data.step === "2" &&
                "Confirming"}
        </Button>
    );
};

export default DeliveriesButton;
