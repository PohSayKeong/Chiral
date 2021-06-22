// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract ChiralToken is ERC2771Context {
    string public symbol = "CLN";
    string public description = "Chiral Token";
    uint256 public decimals = 0;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(address _forwarder) ERC2771Context(_forwarder) {}

    function transferFrom(
        address sender,
        address receiver,
        uint256 amount
    ) public returns (bool sufficient) {
        if (balances[sender] < amount) return false;
        balances[sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(sender, receiver, amount);
        return true;
    }

    function balanceOf(address addr) public view returns (uint256) {
        return balances[addr];
    }

    /**
     * mint some coins for this caller.
     * (in a real-life application, minting is protected for admin, or by other mechanism.
     * but for our sample, any user can mint some coins - but just once..
     */
    function mint(uint256 amount) public {
        balances[_msgSender()] += amount;
    }
}
