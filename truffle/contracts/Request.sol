// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./RequestManager.sol";
import "./ChiralToken.sol";

contract Request {
    string public identifier;
    address public pickupAddress;
    address public courierAddress;
    uint32 public value;
    uint32 public fees;
    RequestManager.weights public weight;
    RequestManager.S_pickup public pickup;
    RequestManager.S_destination public destination;
    RequestManager.steps public step;

    constructor(
        string memory _identifier,
        address _pickupAddress,
        uint32 _value,
        uint32 _fees,
        RequestManager.weights _weight,
        RequestManager.S_pickup memory _pickup,
        RequestManager.S_destination memory _destination,
        ChiralToken _tokenContract,
        RequestManager _parentContract
    ) {
        identifier = _identifier;
        pickupAddress = _pickupAddress;
        value = _value;
        fees = _fees;
        weight = _weight;
        pickup = _pickup;
        destination = _destination;
        step = RequestManager.steps.Created;
        _tokenContract.approve(address(_parentContract), _value + _fees);
    }

    function setCourier(address _courierAddress) public {
        courierAddress = _courierAddress;
    }

    function setStep(RequestManager.steps _step) public {
        step = _step;
    }
}
