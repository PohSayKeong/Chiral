import React from "react";

const LocationContext = React.createContext({
    userAccount: 0,
    userTokens: 0,
    requests: [],
    handleBuyTokens: () => {},
    handleSubmitRequest: () => {},
    handleAcceptRequest: () => {},
    handleDelivered: () => {},
    handleReceived: () => {},
    getItems: () => {},
    getCreatedItems: () => {},
    getAcceptedItems: () => {},
    getDeliveredItems: () => {},
    web3Setup: () => {},
});

export default LocationContext;
