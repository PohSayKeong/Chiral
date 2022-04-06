import React, { useContext } from "react";
import Web3Context from "store/web3/Web3-context";
import CustomModal from "./CustomModal";

const validUnitDetail = (detail) => {
    if (detail !== "0" && detail !== "") {
        return true;
    } else return false;
};

export default function RequestConfirmationModal(props) {
    const web3Ctx = useContext(Web3Context);

    const confirmClickHandler = () => {
        web3Ctx.handleAcceptRequest(props.data);
    };

    return (
        <CustomModal
            children={`${parseInt(props.data.fees)} Tokens`}
            color="info"
            title="Accept request?"
            content={
                <div>
                    <p>
                        You will earn <b>{parseInt(props.data.fees)} tokens</b> for completing this
                        delivery
                    </p>
                    {props.data.value != 0 ? (
                        <div>
                            <p>
                                To ensure that the item is delivered successfully,{" "}
                                <b>{parseInt(props.data.value)} tokens</b> will be deducted from
                                your account as deposit. You will be refunded this amount once
                                completion of delivery is confirmed.
                            </p>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            }
            confirmClickHandler={confirmClickHandler}
        />
    );
}
