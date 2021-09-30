import React from "react";

const Web3Context = React.createContext({
    userAccount: 0,
    userTokens: 0,
    handleBuyTokens: () => {},
    handleSubmitRequest: () => {},
    handleAcceptRequest: () => {},
    handleDelivered: () => {},
    handleReceived: () => {},
    handleCancelled: () => {},
});

export default Web3Context;
