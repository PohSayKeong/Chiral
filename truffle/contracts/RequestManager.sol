// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

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
    mapping(uint64 => S_Request) public requests;
    uint64 index;
    
    struct S_pickup {
    uint64 pickup_lat;
    uint64 pickup_lng;
    uint8 pickup_floor;
    uint16 pickup_unit;
    }
    S_pickup public pickup;

    struct S_destination {
        uint64 destination_lat;
        uint64 destination_lng;
        uint8 destination_floor;
        uint16 destination_unit;
    }
    S_destination public destination;

    enum SupplyChainSteps {
        Created,
        Accepted,
        Delivered,
        Received
    }

    event DisplayStep(
        address indexed pickupAddress,
        address indexed deliveryAddress,
        string identifier,
        uint64 index,
        S_pickup pickup,
        S_destination destination,
        uint64 value,
        uint64 fees,
        uint8 indexed _step,
        uint8 _weight
    );

    function createRequest(
        string memory identifier,
        S_pickup memory _pickup,
        S_destination memory _destination,
        uint64 value,
        uint64 fees,
        Request.weights weight
    ) public {
        require(
            tokenContract.balanceOf(_msgSender()) > fees,
            "Not enough tokens in wallet"
        );
        Request request = new Request(
            this,
            tokenContract,
            value,
            fees,
            index,
            weight
        );
        pickup = _pickup;
        destination = _destination;
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
            pickup,
            destination,
            value,
            fees,
            uint8(requests[index].step),
            uint8(request.weight())
        );
        index++;
    }

    function triggerAccepted(uint64 _index) public {
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
            pickup,
            destination,
            request.value(),
            request.fees(),
            uint8(requests[_index].step),
            uint8(request.weight())
        );
    }

    function triggerDelivery(uint64 _index) public {
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
            pickup,
            destination,
            request.value(),
            request.fees(),
            uint8(requests[_index].step),
            uint8(request.weight())
        );
    }

    function triggerReceive(uint64 _index) public {
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
            pickup,
            destination,
            request.value(),
            request.fees(),
            uint8(requests[_index].step),
            uint8(request.weight())
        );
    }

    function triggerCancel(uint64 _index) public {
        Request request = requests[_index].request;
        require(
            requests[_index].step == SupplyChainSteps.Created,
            "Request already accepted"
        );
        require(
            _msgSender() == requests[_index].pickupAddress,
            "This is not your item"
        );
        requests[_index].step = SupplyChainSteps.Received;
        tokenContract.transferFrom(
            address(request),
            requests[_index].pickupAddress,
            tokenContract.balanceOf(address(request))
        );
        emit DisplayStep(
            requests[_index].pickupAddress,
            requests[_index].deliveryAddress,
            requests[_index].identifier,
            _index,
            pickup,
            destination,
            request.value(),
            request.fees(),
            uint8(requests[_index].step),
            uint8(request.weight())
        );
    }
}
