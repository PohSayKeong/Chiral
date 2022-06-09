import Web3Modal from "web3modal";
import ChiralToken from "contracts/ChiralToken.json";
import RequestManager from "contracts/RequestManager.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { RelayProvider } from "@opengsn/provider";
import Web3 from "web3";

export default async function initWeb3Provider() {
    if (typeof document !== "undefined") {
        const web3Modal = new Web3Modal({
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        rpc: {
                            80001: "https://matic-mumbai.chainstacklabs.com",
                        },
                    },
                },
            },
        });
        web3Modal.clearCachedProvider();

        const provider = await web3Modal.connect();

        // set Metamask to the right chain
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: "0x13881",
                            chainName: "Polygon Testnet Mumbai",
                            rpcUrls: [
                                "https://matic-testnet-archive-rpc.bwarelabs.com/",
                            ],
                            nativeCurrency: {
                                name: "MATIC",
                                symbol: "MATIC",
                                decimals: 18,
                            },
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        }

        const config = {
            paymasterAddress: "0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A",
            methodSuffix: "_v4",
            jsonStringifyRequest: true,
            relayRegistrationLookupBlocks: 1000000,
        };

        // const gsnProvider = await RelayProvider.newProvider({
        //     provider,
        //     config,
        // }).init();
        // const GSNWeb3 = new Web3(gsnProvider);
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

        const requestManagerAllowance = await newTokenInstance.methods
            .allowance(newAccounts[0], newRequestManagerInstance._address)
            .call();

        return {
            web3: GSNWeb3,
            account: newAccounts[0],
            tokenInstance: newTokenInstance,
            requestManagerInstance: newRequestManagerInstance,
            newUser: requestManagerAllowance === "0",
            userTokens: 0,
        };
    }
}
