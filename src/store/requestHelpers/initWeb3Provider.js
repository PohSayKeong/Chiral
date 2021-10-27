import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import ChiralToken from "contracts/ChiralToken.json";
import RequestManager from "contracts/RequestManager.json";
import { RelayProvider } from "@opengsn/provider";
import Web3 from "web3";

export default async function initWeb3Provider() {
    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions: {
            portis: {
                package: Portis, // required
                options: {
                    id: "c10b0c49-7c84-4360-a6c4-1574cad79d9d", // required
                    network: {
                        nodeUrl:
                            "https://matic-testnet-archive-rpc.bwarelabs.com/",
                        chainId: 80001,
                    },
                },
            },
        },
    });

    const provider = await web3Modal.connect();

    const config = {
        paymasterAddress: "0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A",
        methodSuffix: "_v3",
        jsonStringifyRequest: true,
        relayRegistrationLookupBlocks: 1000000,
    };

    const gsnProvider = await RelayProvider.newProvider({
        provider,
        config,
    }).init();
    const GSNWeb3 = new Web3(gsnProvider);

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

    return {
        web3: GSNWeb3,
        account: newAccounts[0],
        tokenInstance: newTokenInstance,
        requestManagerInstance: newRequestManagerInstance,
    };
}
