const ChiralToken = artifacts.require("./ChiralToken.sol");
const Crowdsale = artifacts.require("./Crowdsale.sol");
const RequestManager = artifacts.require("./RequestManager.sol");
require("dotenv").config({ path: "../.env" });

module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(ChiralToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(Crowdsale, 1, addr[0], ChiralToken.address);
    await deployer.deploy(RequestManager, ChiralToken.address);
    let tokenInstance = await ChiralToken.deployed();
    await tokenInstance.transfer(Crowdsale.address, process.env.INITIAL_TOKENS);
};
