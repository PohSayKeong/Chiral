import React, { useCallback, useEffect, useState } from "react";
import Web3Context from "./Web3-context";
import ChiralToken from "../contracts/ChiralToken.json";
import RequestManager from "../contracts/RequestManager.json";
import getWeb3 from "../getWeb3";
import { RelayProvider } from "@opengsn/provider";
import Web3 from "web3";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";

const Web3Provider = (props) => {
    const [web3State, setWeb3State] = useState({
        accounts: [],
        tokenInstance: {},
        requestManagerInstance: {},
        web3: {},
        userTokens: 0,
    });
    const [requests, setRequests] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const paymasterAddress = "0xA6e10aA9B038c9Cddea24D2ae77eC3cE38a0c016";
    const config = {
        paymasterAddress,
    };
    const dispatch = useDispatch();
    const pending = () => {
        dispatch(
            uiActions.showNotification({
                status: "pending",
            })
        );
    };
    const success = () => {
        dispatch(
            uiActions.showNotification({
                status: "success",
            })
        );
    };
    const failed = () => {
        dispatch(
            uiActions.showNotification({
                status: "failed",
            })
        );
    };

    const web3Setup = async () => {
        try {
            // Get network provider and web3 instance.
            const newWeb3 = await getWeb3();
            const provider = await RelayProvider.newProvider({
                provider: newWeb3.currentProvider,
                config,
            }).init();
            const GSNWeb3 = new Web3(provider);

            // Use web3 to get the user's accounts.
            const newAccounts = await GSNWeb3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await GSNWeb3.eth.net.getId();
            const newTokenInstance = new GSNWeb3.eth.Contract(
                ChiralToken.abi,
                ChiralToken.networks[networkId] &&
                    ChiralToken.networks[networkId].address
            );
            const newRequestManagerInstance = new GSNWeb3.eth.Contract(
                RequestManager.abi,
                RequestManager.networks[networkId] &&
                    RequestManager.networks[networkId].address
            );
            await setWeb3State((prevState) => {
                return {
                    ...prevState,
                    web3: GSNWeb3,
                    accounts: newAccounts,
                    tokenInstance: newTokenInstance,
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
        pending();
        try {
            await web3State.tokenInstance.methods.mint(amount).send({
                from: web3State.accounts[0],
                gas: 30000,
            });
            await updateUserTokens();
            success();
        } catch {
            failed();
        }
    };

    const handleSubmitRequest = async (data) => {
        pending();
        try {
            await web3State.requestManagerInstance.methods
                .createRequest(
                    data.name,
                    data.pickup,
                    data.destination,
                    data.value,
                    data.fees,
                    data.weight
                )
                .send({
                    from: web3State.accounts[0],
                    gas: 1000000,
                });
            await updateUserTokens();
            setLoaded(false);
            success();
        } catch {
            failed();
        }
    };

    const handleAcceptRequest = async (data) => {
        pending();
        try {
            await web3State.requestManagerInstance.methods
                .triggerAccepted(data.index)
                .send({
                    from: web3State.accounts[0],
                    gas: 150000,
                });
            await updateUserTokens();
            setLoaded(false);
            success();
        } catch {
            failed();
        }
    };

    const handleDelivered = async (data) => {
        pending();
        try {
            await web3State.requestManagerInstance.methods
                .triggerDelivery(data.index)
                .send({
                    from: web3State.accounts[0],
                    gas: 80000,
                });
            setLoaded(false);
            success();
        } catch {
            failed();
        }
    };

    const handleReceived = async (data) => {
        pending();
        try {
            await web3State.requestManagerInstance.methods
                .triggerReceive(data.index)
                .send({
                    from: web3State.accounts[0],
                    gas: 100000,
                });
            setLoaded(false);
            success();
        } catch {
            failed();
        }
    };

    const handleCancelled = async (data) => {
        pending();
        try {
            await web3State.requestManagerInstance.methods
                .triggerCancel(data.index)
                .send({
                    from: web3State.accounts[0],
                    gas: 100000,
                });
            await updateUserTokens();
            setLoaded(false);
            success();
        } catch {
            failed();
        }
    };

    const getRequests = async () => {
        if (web3State.requestManagerInstance.events && !loaded) {
            const toCoord = Math.pow(10, 15).toFixed(10);
            let result = [];
            await web3State.requestManagerInstance
                .getPastEvents("allEvents", {
                    fromBlock: 1,
                })
                .then((response) =>
                    response.map((item) => {
                        const temp = {
                            ...item.returnValues,
                            ...item.returnValues.pickup,
                            ...item.returnValues.destination,
                        };
                        temp.pickup_lng /= toCoord;
                        temp.pickup_lat /= toCoord;
                        temp.destination_lng /= toCoord;
                        temp.destination_lat /= toCoord;
                        if (!result[item.returnValues.index]) {
                            result.push(temp);
                        } else {
                            result[item.returnValues.index] = temp;
                        }
                        return true;
                    })
                );
            setLoaded(true);
            setRequests(result);
        }
    };

    const getCreatedRequests = () => {
        return requests.filter((request) => request._step === "0");
    };

    const getAcceptedRequests = () => {
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

    const web3Context = {
        userAccount: web3State.accounts[0],
        userTokens: web3State.userTokens,
        handleBuyTokens,
        handleSubmitRequest,
        handleAcceptRequest,
        handleDelivered,
        handleReceived,
        handleCancelled,
        getRequests,
        getCreatedRequests,
        getAcceptedRequests,
        web3Setup,
    };

    return (
        <Web3Context.Provider value={web3Context}>
            {props.children}
        </Web3Context.Provider>
    );
};

export default Web3Provider;
