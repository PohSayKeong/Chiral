const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        ganache_local: {
            provider: function () {
                return new HDWalletProvider(
                    process.env.GANACHE_MNEMONIC,
                    "http://127.0.0.1:7545",
                    0
                );
            },
            network_id: 1337,
        },
    },
    compilers: {
        solc: {
            version: "^0.8.4",
        },
    },
};
