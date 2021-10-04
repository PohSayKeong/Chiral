import React, { useCallback, useEffect, useState } from "react";
import Web3Context from "./Web3-context";
import { useDispatch, useSelector } from "react-redux";
import initWeb3Provider from "./requestHelpers/initWeb3Provider";
import buyTokens from "./tokenHelper/buyTokens";
import submitRequest from "./requestHelpers/submitRequest";
import acceptRequest from "./requestHelpers/acceptRequest";
import delivered from "./requestHelpers/delivered";
import received from "./requestHelpers/received";
import cancelled from "./requestHelpers/cancelled";
import getRequests from "./requestHelpers/getRequests";

const Web3Provider = (props) => {
    const [web3State, setWeb3State] = useState({
        web3: {},
        account: "",
        tokenInstance: {},
        requestManagerInstance: {},
        userTokens: 0,
    });
    const userCoord = useSelector((state) => state.user.location);
    const dispatch = useDispatch();

    const web3Setup = useCallback(async () => {
        try {
            const web3Values = await initWeb3Provider();
            web3Values.web3.currentProvider.on("accountsChanged", web3Setup);
            setWeb3State(web3Values);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(`Please restart the app and login with Portis/Metamask.`);
            console.error(error);
            web3Setup();
        }
    }, []);

    // Run web3Setup when app launches
    useEffect(() => {
        web3Setup();
    }, [web3Setup]);

    const updateUserTokens = useCallback(async () => {
        const newUserTokens = await web3State.tokenInstance.methods
            .balanceOf(web3State.account)
            .call();
        setWeb3State((prevState) => {
            return { ...prevState, userTokens: newUserTokens };
        });
    }, [web3State.account, web3State.tokenInstance.methods]);

    const handleGetRequests = useCallback(async () => {
        await getRequests(
            web3State.requestManagerInstance,
            web3State.account,
            userCoord,
            dispatch
        );
    }, [
        web3State.requestManagerInstance,
        web3State.account,
        userCoord,
        dispatch,
    ]);

    // get user tokens and request when app launches
    useEffect(() => {
        if (web3State.account) {
            updateUserTokens();
            handleGetRequests();
        }
    }, [web3State.account, updateUserTokens, handleGetRequests]);

    const handleBuyTokens = async (amount) => {
        await buyTokens(amount, web3State, dispatch);
        await updateUserTokens();
    };

    const handleSubmitRequest = async (data) => {
        await submitRequest(data, web3State, dispatch);
        await updateUserTokens();
    };

    const handleAcceptRequest = async (data) => {
        await acceptRequest(data, web3State, dispatch);
        await updateUserTokens();
    };

    const handleDelivered = async (data) => {
        await delivered(data, web3State, dispatch);
    };

    const handleReceived = async (data) => {
        await received(data, web3State, dispatch);
    };

    const handleCancelled = async (data) => {
        await cancelled(data, web3State, dispatch);
        await updateUserTokens();
    };

    const web3Context = {
        userAccount: web3State.account,
        userTokens: web3State.userTokens,
        handleBuyTokens,
        handleSubmitRequest,
        handleAcceptRequest,
        handleDelivered,
        handleReceived,
        handleCancelled,
    };

    if (web3State.requestManagerInstance.events) {
        web3State.requestManagerInstance.events
            .allEvents()
            .on("data", handleGetRequests);
    }

    return (
        <Web3Context.Provider value={web3Context}>
            {props.children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
