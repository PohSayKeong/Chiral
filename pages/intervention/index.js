import React from "react";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";
import InterventionApp from "components/intervention/InterventionApp";

const InterventionAppContainer = () => {
    return (
        <Provider store={store}>
            <Web3Provider>
                <InterventionApp />
            </Web3Provider>
        </Provider>
    );
};

export default InterventionAppContainer;
