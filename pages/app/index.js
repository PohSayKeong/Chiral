import React from "react";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";
import RequestApp from "../../components/app/RequestApp";
import Head from "next/head";

const RequestAppContainer = () => {
    return (
        <>
            <Head>
                <title>Chiral | P2P Courier Platform | App</title>
            </Head>
            <Provider store={store}>
                <Web3Provider>
                    <RequestApp />
                </Web3Provider>
            </Provider>
        </>
    );
};

export default RequestAppContainer;
