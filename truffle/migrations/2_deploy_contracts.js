const ChiralToken = artifacts.require("./ChiralToken.sol");
const RequestManager = artifacts.require("./RequestManager.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    const forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a";
    await deployer.deploy(ChiralToken, forwarder);
    await deployer.deploy(RequestManager, ChiralToken.address, forwarder);
};
