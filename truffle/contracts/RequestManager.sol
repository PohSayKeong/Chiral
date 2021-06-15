// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Request.sol";
import "./ChiralToken.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract RequestManager is ERC2771Context {
    ChiralToken tokenContract;

    constructor(ChiralToken newtoken, address _forwarder)
        ERC2771Context(_forwarder)
    {
        tokenContract = newtoken;
    }

    struct S_Request {
        Request request;
        RequestManager.SupplyChainSteps step;
        string identifier;
        address pickupAddress;
        address deliveryAddress;
    }
    mapping(uint256 => S_Request) public requests;
    uint256 index;

    enum SupplyChainSteps {Created, Accepted, Delivered, Received}

    event DisplayStep(
        address indexed pickupAddress,
        address indexed deliveryAddress,
        string identifier,
        uint256 index,
        uint256 pickup_lat,
        uint256 pickup_lng,
        uint256 destination_lat,
        uint256 destination_lng,
        uint256 value,
        uint256 fees,
        uint256 indexed _step
    );

    function createRequest(
        string memory identifier,
        uint256 pickup_lat,
        uint256 pickup_lng,
        uint256 destination_lat,
        uint256 destination_lng,
        uint256 value,
        uint256 fees
    ) public {
        require(
            tokenContract.balanceOf(_msgSender()) > fees,
            "Not enough tokens in wallet"
        );
        Request request =
            new Request(
                this,
                tokenContract,
                pickup_lat,
                pickup_lng,
                destination_lat,
                destination_lng,
                value,
                fees,
                index
            );
        requests[index].request = request;
        requests[index].step = SupplyChainSteps.Created;
        requests[index].identifier = identifier;
        tokenContract.transferFrom(_msgSender(), address(request), fees);
        requests[index].pickupAddress = _msgSender();
        emit DisplayStep(
            requests[index].pickupAddress,
            requests[index].deliveryAddress,
            identifier,
            index,
            pickup_lat,
            pickup_lng,
            destination_lat,
            destination_lng,
            value,
            fees,
            uint256(requests[index].step)
        );
        index++;
    }

    function triggerAccepted(uint256 _index) public {
        Request request = requests[_index].request;
        require(
            requests[_index].step == SupplyChainSteps.Created,
            "Request is not available"
        );
        require(
            tokenContract.balanceOf(_msgSender()) > request.value(),
            "Please deposit full stake"
        );
        require(
            _msgSender() != requests[_index].pickupAddress,
            "This is your own request"
        );
        tokenContract.transferFrom(
            _msgSender(),
            address(request),
            request.value()
        );
        requests[_index].deliveryAddress = _msgSender();
        requests[_index].step = SupplyChainSteps.Accepted;
        emit DisplayStep(
            requests[_index].pickupAddress,
            requests[_index].deliveryAddress,
            requests[_index].identifier,
            _index,
            request.pickup_lat(),
            request.pickup_lng(),
            request.destination_lat(),
            request.destination_lng(),
            request.value(),
            request.fees(),
            uint256(requests[_index].step)
        );
    }

    function triggerDelivery(uint256 _index) public {
        Request request = requests[_index].request;
        require(
            requests[_index].step == SupplyChainSteps.Accepted,
            "Request not on delivery"
        );
        require(
            _msgSender() == requests[_index].deliveryAddress,
            "This is not your delivery"
        );
        requests[_index].step = SupplyChainSteps.Delivered;
        emit DisplayStep(
            requests[_index].pickupAddress,
            requests[_index].deliveryAddress,
            requests[_index].identifier,
            _index,
            request.pickup_lat(),
            request.pickup_lng(),
            request.destination_lat(),
            request.destination_lng(),
            request.value(),
            request.fees(),
            uint256(requests[_index].step)
        );
    }

    function triggerReceive(uint256 _index) public {
        Request request = requests[_index].request;
        require(
            requests[_index].step == SupplyChainSteps.Delivered,
            "Request not delivered"
        );
        require(
            _msgSender() == requests[_index].pickupAddress,
            "This is not your item"
        );
        requests[_index].step = SupplyChainSteps.Received;
        tokenContract.transferFrom(
            address(request),
            requests[_index].deliveryAddress,
            tokenContract.balanceOf(address(request))
        );
        emit DisplayStep(
            requests[_index].pickupAddress,
            requests[_index].deliveryAddress,
            requests[_index].identifier,
            _index,
            request.pickup_lat(),
            request.pickup_lng(),
            request.destination_lat(),
            request.destination_lng(),
            request.value(),
            request.fees(),
            uint256(requests[_index].step)
        );
    }
}
