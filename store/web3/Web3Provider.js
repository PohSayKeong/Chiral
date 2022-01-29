import React, { useCallback, useEffect, useState } from "react";
import Web3Context from "./Web3-context";
import { useDispatch, useSelector } from "react-redux";
import initWeb3Provider from "./initWeb3Provider";
import buyTokens from "store/tokenHelper/buyTokens";
import submitRequest from "store/requestHelpers/submitRequest";
import acceptRequest from "store/requestHelpers/acceptRequest";
import delivered from "store/requestHelpers/delivered";
import received from "store/requestHelpers/received";
import cancelled from "store/requestHelpers/cancelled";
import getRequests from "store/requestHelpers/getRequests";
import * as ga from "/lib/ga";

const Web3Provider = (props) => {
    const [web3State, setWeb3State] = useState({
        web3: {},
        account: "",
        tokenInstance: {},
        requestManagerInstance: {},
    });
    const userCoord = useSelector((state) => state.user.location);
    const prevResult = useSelector((state) => state.request.result);
    const dispatch = useDispatch();

    const web3Setup = useCallback(async () => {
        try {
            const web3Values = await initWeb3Provider();
            ga.event({ action: "wallet_connected" });
            web3Values.web3.currentProvider.on("accountsChanged", web3Setup);
            setWeb3State(web3Values);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Please restart the app and login with Torus/Metamask. Ensure that you are on the Mumbai testnet`
            );
            console.error(error);
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
            return { ...prevState, userTokens: newUserTokens / 10 ** 18 };
        });
    }, [web3State.account, web3State.tokenInstance.methods]);

    const handleGetRequests = useCallback(async () => {
        await getRequests(
            web3State.requestManagerInstance,
            web3State.account,
            userCoord,
            prevResult,
            dispatch
        );
    }, [
        web3State.requestManagerInstance,
        web3State.account,
        userCoord,
        prevResult,
        dispatch,
    ]);

    // get user tokens and request when app launches
    useEffect(() => {
        const updateInterval = setInterval(handleGetRequests, 30000);
        if (web3State.account) {
            updateUserTokens();
            handleGetRequests();
        }
        return () => {
            clearInterval(updateInterval);
        };
    }, [web3State.account, updateUserTokens, handleGetRequests]);

    const handleBuyTokens = async () => {
        if (web3State.newUser) {
            ga.event({ action: "claim_token" });
            await buyTokens(1000, web3State, dispatch).then((res) => {
                if (res.success) {
                    setWeb3State((prevState) => {
                        return { ...prevState, newUser: false };
                    });
                }
            });
            await updateUserTokens();
        }
    };

    const handleSubmitRequest = async (data) => {
        ga.event({ action: "submit_request" });
        await submitRequest(data, web3State, dispatch);
        await updateUserTokens();
        await handleGetRequests();
    };

    const handleAcceptRequest = async (data) => {
        ga.event({ action: "accept_request" });
        await acceptRequest(data, web3State, dispatch);
        await updateUserTokens();
        await handleGetRequests();
    };

    const handleDelivered = async (data) => {
        ga.event({ action: "delivered" });
        await delivered(data, web3State, dispatch);
        await handleGetRequests();
    };

    const handleReceived = async (data) => {
        ga.event({ action: "received" });
        await received(data, web3State, dispatch);
        await handleGetRequests();
    };

    const handleCancelled = async (data) => {
        ga.event({ action: "cancelled" });
        await cancelled(data, web3State, dispatch);
        await updateUserTokens();
        await handleGetRequests();
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
        newUser: web3State.newUser,
    };

    return (
        <Web3Context.Provider value={web3Context}>
            {props.children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
