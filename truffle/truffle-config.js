const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        ganache_local: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
        },
        rinkeby_infura: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    "https://rinkeby.infura.io/v3/7576cd7905134616b987c3e370c7b2f2",
                    0
                );
            },
            network_id: 4,
        },
    },
    compilers: {
        solc: {
            version: "0.8.4",
        },
    },
};
