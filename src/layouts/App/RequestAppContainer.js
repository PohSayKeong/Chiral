import React from "react";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";
import RequestApp from "./RequestApp";

const RequestAppContainer = () => {
    return (
        <Provider store={store}>
            <Web3Provider>
                <RequestApp />
            </Web3Provider>
        </Provider>
    );
};

export default RequestAppContainer;
