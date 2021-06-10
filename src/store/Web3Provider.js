import React, { useCallback, useEffect, useState } from "react";
import Web3Context from "./Web3-context";
import ChiralToken from "../contracts/ChiralToken.json";
import Crowdsale from "../contracts/Crowdsale.json";
import RequestManager from "../contracts/RequestManager.json";
import getWeb3 from "../getWeb3";

const Web3Provider = (props) => {
    const [web3State, setWeb3State] = useState({
        accounts: [],
        tokenInstance: {},
        tokenSaleInstance: {},
        requestManagerInstance: {},
        web3: {},
        userTokens: 0,
    });
    const [requests, setRequests] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const web3Setup = async () => {
        try {
            // Get network provider and web3 instance.
            const newWeb3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const newAccounts = await newWeb3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await newWeb3.eth.net.getId();
            const newTokenInstance = new newWeb3.eth.Contract(
                ChiralToken.abi,
                ChiralToken.networks[networkId] &&
                    ChiralToken.networks[networkId].address
            );
            const newTokenSaleInstance = new newWeb3.eth.Contract(
                Crowdsale.abi,
                Crowdsale.networks[networkId] &&
                    Crowdsale.networks[networkId].address
            );
            const newRequestManagerInstance = new newWeb3.eth.Contract(
                RequestManager.abi,
                RequestManager.networks[networkId] &&
                    RequestManager.networks[networkId].address
            );
            await setWeb3State((prevState) => {
                return {
                    ...prevState,
                    web3: newWeb3,
                    accounts: newAccounts,
                    tokenInstance: newTokenInstance,
                    tokenSaleInstance: newTokenSaleInstance,
                    requestManagerInstance: newRequestManagerInstance,
                };
            });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    };

    const updateUserTokens = useCallback(async () => {
        const newUserTokens = await web3State.tokenInstance.methods
            .balanceOf(web3State.accounts[0])
            .call();
        setWeb3State((prevState) => {
            return { ...prevState, userTokens: newUserTokens };
        });
    }, [web3State.accounts, web3State.tokenInstance.methods]);

    useEffect(() => {
        if (web3State.accounts[0]) {
            updateUserTokens();
        }
    }, [web3State.accounts, updateUserTokens]);

    const handleBuyTokens = async (amount) => {
        await web3State.tokenSaleInstance.methods
            .buyTokens(web3State.accounts[0])
            .send({
                from: web3State.accounts[0],
                value: web3State.web3.utils.toWei(amount, "wei"),
            });
        await updateUserTokens();
    };

    const handleSubmitRequest = async (data) => {
        await web3State.tokenInstance.methods
            .increaseAllowance(
                web3State.requestManagerInstance._address,
                data.fees
            )
            .send({
                from: web3State.accounts[0],
            });
        await web3State.requestManagerInstance.methods
            .createRequest(...Object.values(data))
            .send({
                from: web3State.accounts[0],
            });
        await updateUserTokens();
        setLoaded(false);
    };

    const handleAcceptRequest = async (data) => {
        await web3State.tokenInstance.methods
            .increaseAllowance(
                web3State.requestManagerInstance._address,
                data.value
            )
            .send({
                from: web3State.accounts[0],
            });
        await web3State.requestManagerInstance.methods
            .triggerAccepted(data.index)
            .send({
                from: web3State.accounts[0],
            });
        await updateUserTokens();
        setLoaded(false);
    };

    const handleDelivered = async (data) => {
        await web3State.requestManagerInstance.methods
            .triggerDelivery(data.index)
            .send({
                from: web3State.accounts[0],
            });
        setLoaded(false);
    };

    const handleReceived = async (data) => {
        await web3State.requestManagerInstance.methods
            .triggerReceive(data.index)
            .send({
                from: web3State.accounts[0],
            });
        setLoaded(false);
    };

    const getItems = async () => {
        if (web3State.requestManagerInstance.events && !loaded) {
            let result = [];
            await web3State.requestManagerInstance
                .getPastEvents("allEvents", {
                    filter: {
                        pickupAddress: web3State.accounts[0],
                    },
                    fromBlock: 1,
                })
                .then((response) =>
                    response.map((item) => {
                        item.returnValues.pickup_lng =
                            item.returnValues.pickup_lng /
                            Math.pow(10, 15).toFixed(10);
                        item.returnValues.pickup_lat =
                            item.returnValues.pickup_lat /
                            Math.pow(10, 15).toFixed(10);
                        item.returnValues.destination_lng =
                            item.returnValues.destination_lng /
                            Math.pow(10, 15).toFixed(10);
                        item.returnValues.destination_lat =
                            item.returnValues.destination_lat /
                            Math.pow(10, 15).toFixed(10);
                        if (!result[item.returnValues.index]) {
                            result.push(item.returnValues);
                        } else {
                            result[item.returnValues.index] = item.returnValues;
                        }
                        return true;
                    })
                );
            setLoaded(true);
            setRequests(result);
        }
    };

    const getCreatedItems = () => {
        const created = requests.filter((request) => request._step === "0");
        return created;
    };

    const getAcceptedItems = () => {
        const created = requests.filter(
            (request) =>
                request.pickupAddress === web3State.accounts[0] &&
                request._step !== "3"
        );
        const accepted = requests.filter(
            (request) =>
                request._step === "1" &&
                request.deliveryAddress === web3State.accounts[0]
        );
        return accepted.concat(created);
    };

    const getDeliveredItems = () => {};

    const web3Context = {
        userAccount: web3State.accounts[0],
        userTokens: web3State.userTokens,
        requests: requests,
        handleBuyTokens: handleBuyTokens,
        handleSubmitRequest: handleSubmitRequest,
        handleAcceptRequest: handleAcceptRequest,
        handleDelivered: handleDelivered,
        handleReceived: handleReceived,
        getItems: getItems,
        getCreatedItems: getCreatedItems,
        getAcceptedItems: getAcceptedItems,
        getDeliveredItems: getDeliveredItems,
        web3Setup: web3Setup,
    };

    return (
        <Web3Context.Provider value={web3Context}>
            {props.children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
