// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./RequestManager.sol";
import "./ChiralToken.sol";

contract Request {
    address public pickupAddress;
    uint256 public pickup_lat;
    uint256 public pickup_lng;
    uint256 public destination_lat;
    uint256 public destination_lng;
    uint256 public value;
    uint256 public fees;
    uint256 public index;
    address public deliveryAddress;

    RequestManager parentContract;
    ChiralToken tokenContract;

    constructor(
        RequestManager _parentContract,
        ChiralToken _tokenContract,
        uint256 _pickup_lat,
        uint256 _pickup_lng,
        uint256 _destination_lat,
        uint256 _destination_lng,
        uint256 _value,
        uint256 _fees,
        uint256 _index
    ) {
        parentContract = _parentContract;
        tokenContract = _tokenContract;
        pickup_lat = _pickup_lat;
        pickup_lng = _pickup_lng;
        destination_lat = _destination_lat;
        destination_lng = _destination_lng;
        value = _value;
        fees = _fees;
        index = _index;
        tokenContract.increaseAllowance(address(parentContract), value + fees);
    }

    receive() external payable {}
}
