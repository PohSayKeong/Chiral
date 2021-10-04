import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import ChiralToken from "contracts/ChiralToken.json";
import RequestManager from "contracts/RequestManager.json";
import { RelayProvider } from "@opengsn/provider";
import Web3 from "web3";

export default async function initWeb3Provider() {
    const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions: {
            portis: {
                package: Portis, // required
                options: {
                    id: "c10b0c49-7c84-4360-a6c4-1574cad79d9d", // required
                },
            },
        },
    });

    const provider = await web3Modal.connect();

    const config = {
        paymasterAddress: "0xA6e10aA9B038c9Cddea24D2ae77eC3cE38a0c016",
        methodSuffix: "_v3",
        jsonStringifyRequest: true,
        //log everything (0=debug, 5=error)
        logLevel: 0,
        // send all log to central log server, for possible troubleshooting
        loggerUrl: "https://gsn-logger.netlify.app",
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
