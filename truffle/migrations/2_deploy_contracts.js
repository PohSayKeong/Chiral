const ChiralToken = artifacts.require("./ChiralToken.sol");
const Crowdsale = artifacts.require("./Crowdsale.sol");
const RequestManager = artifacts.require("./RequestManager.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    const forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a";
    await deployer.deploy(ChiralToken, process.env.INITIAL_TOKENS, forwarder);
    await deployer.deploy(
        Crowdsale,
        1,
        addr[0],
        ChiralToken.address,
        forwarder
    );
    await deployer.deploy(RequestManager, ChiralToken.address, forwarder);
    let tokenInstance = await ChiralToken.deployed();
    await tokenInstance.transfer(Crowdsale.address, process.env.INITIAL_TOKENS);
};
