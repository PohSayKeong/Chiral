// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChiralToken is ERC2771Context, ERC20 {
    mapping(address => uint256) balances;

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address sender)
    {
        sender = ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    constructor(address _forwarder, uint256 amount)
        ERC2771Context(_forwarder)
        ERC20("ChiralToken", "CLT")
    {
        _mint(_msgSender(), amount);
    }

    /**
     * mint some coins for this caller.
     * (in a real-life application, minting is protected for admin, or by other mechanism.
     * but for our sample, any user can mint some coins
     */

    function mint(uint256 amount) public {
        _mint(_msgSender(), amount);
    }
}
