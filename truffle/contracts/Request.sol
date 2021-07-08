// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./RequestManager.sol";
import "./ChiralToken.sol";

contract Request {
    address public pickupAddress;
    uint64 public value;
    uint64 public fees;
    uint64 public index;
    address public deliveryAddress;
    enum weights {
        foot,
        bike,
        car
    }
    weights public weight;
    

    RequestManager parentContract;
    ChiralToken tokenContract;

    constructor(
        RequestManager _parentContract,
        ChiralToken _tokenContract,
        uint64 _value,
        uint64 _fees,
        uint64 _index,
        weights _weight
    ) {
        parentContract = _parentContract;
        tokenContract = _tokenContract;
        value = _value;
        fees = _fees;
        index = _index;
        weight = _weight;
    }

    receive() external payable {}
}