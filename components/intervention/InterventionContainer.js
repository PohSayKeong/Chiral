import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Web3Context from "store/web3/Web3-context";
import { v4 as uuidv4 } from "uuid";
import Intervention from "./Intervention";

const InterventionContainer = () => {
    const web3Ctx = useContext(Web3Context);
    // Retrieve reported Requests
    const myReportedRequests = useSelector(
        (state) => state.request.reportedRequests
    );

    // Filter reports that involve the third party and convert to mutable variable
    let reportedRequests = myReportedRequests.filter(
        (item) =>
            web3Ctx.userAccount != item.pickupAddress &&
            web3Ctx.userAccount != item.courierAddress
    );

    Web3Context;

    return (
        <div
            style={{
                padding: "12px",
                height: "800px",
                overflow: "auto",
            }}
        >
            {reportedRequests.map((item) => {
                return <Intervention data={item} key={uuidv4()} />;
            })}
        </div>
    );
};

export default InterventionContainer;
