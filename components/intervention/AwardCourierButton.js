import React, { Fragment, useContext } from "react";
import Web3Context from "store/web3/Web3-context";
import { chatActions } from "store/chat-slice";
import { requestActions } from "store/request-slice";
import { useDispatch } from "react-redux";
import CustomModal from "UI/Custom/Modals/CustomModal";

const AwardCourierButton = (props) => {
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(requestActions.setViewData(props.data));
        dispatch(chatActions.setChat(null));
        web3Ctx.handleAwardCourier(props.data);
    };

    return (
        <CustomModal
            color="primary"
            round={false}
            title="Final Confirmation"
            content={
                <Fragment>
                    Award tokens to <strong>COURIER</strong>
                </Fragment>
            }
            confirmClickHandler={clickHandler}
        >
            Award to&nbsp;<strong>COURIER</strong>
        </CustomModal>
    );
};

export default AwardCourierButton;
