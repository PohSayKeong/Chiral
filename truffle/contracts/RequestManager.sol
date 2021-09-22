// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

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

    mapping(uint32 => Request) public requests;
    uint32 nextIndex;
    enum weights {
        foot,
        bike,
        car
    }
    struct S_pickup {
        uint64 pickup_lat;
        uint64 pickup_lng;
        uint8 pickup_floor;
        uint16 pickup_unit;
    }

    struct S_destination {
        uint64 destination_lat;
        uint64 destination_lng;
        uint8 destination_floor;
        uint16 destination_unit;
    }

    enum steps {
        Created,
        Accepted,
        Delivered,
        Received,
        Cancelled,
        Intervention
    }

    event Created(
        uint32 index,
        string identifier,
        address indexed pickupAddress,
        uint32 value,
        uint32 fees,
        uint8 weight,
        S_pickup pickup,
        S_destination destination,
        uint8 indexed step
    );

    event Accepted(
        uint32 index,
        address indexed courierAddress,
        uint8 indexed step
    );

    event Verdict(uint32 index, address winner);

    event Step(uint32 index, uint8 indexed step);

    function createRequest(
        string memory identifier,
        S_pickup memory pickup,
        S_destination memory destination,
        uint32 value,
        uint32 fees,
        weights weight
    ) public {
        require(tokenContract.balanceOf(_msgSender()) > fees);
        Request request = new Request(
            identifier,
            _msgSender(),
            value,
            fees,
            weight,
            pickup,
            destination,
            tokenContract,
            this
        );
        requests[nextIndex] = request;
        tokenContract.transferFrom(_msgSender(), address(request), fees);
        emit Created(
            nextIndex,
            identifier,
            _msgSender(),
            value,
            fees,
            uint8(weight),
            pickup,
            destination,
            uint8(steps.Created)
        );
        nextIndex++;
    }

    function triggerAccepted(uint32 _index) public {
        require(requests[_index].step() == steps.Created);
        require(
            tokenContract.balanceOf(_msgSender()) > requests[_index].value()
        );
        require(_msgSender() != requests[_index].pickupAddress());
        tokenContract.transferFrom(
            _msgSender(),
            address(requests[_index]),
            requests[_index].value()
        );
        requests[_index].setCourier(_msgSender());
        requests[_index].setStep(steps.Accepted);
        emit Accepted(
            _index,
            requests[_index].courierAddress(),
            uint8(requests[_index].step())
        );
    }

    function triggerDelivery(uint32 _index) public {
        require(requests[_index].step() == steps.Accepted);
        require(_msgSender() == requests[_index].courierAddress());
        requests[_index].setStep(steps.Delivered);
        emit Step(_index, uint8(requests[_index].step()));
    }

    function triggerReceive(uint32 _index) public {
        require(requests[_index].step() == steps.Delivered);
        require(_msgSender() == requests[_index].pickupAddress());
        requests[_index].setStep(steps.Received);
        tokenContract.transferFrom(
            address(requests[_index]),
            requests[_index].courierAddress(),
            tokenContract.balanceOf(address(requests[_index]))
        );
        emit Step(_index, uint8(requests[_index].step()));
    }

    function triggerCancel(uint32 _index) public {
        require(requests[_index].step() == steps.Created);
        require(_msgSender() == requests[_index].pickupAddress());
        requests[_index].setStep(steps.Cancelled);
        tokenContract.transferFrom(
            address(requests[_index]),
            requests[_index].pickupAddress(),
            tokenContract.balanceOf(address(requests[_index]))
        );
        emit Step(_index, uint8(requests[_index].step()));
    }

    function triggerReport(uint32 _index) public {
        require(
            _msgSender() == requests[_index].pickupAddress() ||
                _msgSender() == requests[_index].courierAddress()
        );
        require(
            requests[_index].step() != steps.Created &&
                requests[_index].step() != steps.Cancelled
        );
        require(requests[_index].step() != steps.Intervention);
        requests[_index].setStep(steps.Intervention);
        emit Step(_index, uint8(requests[_index].step()));
    }

    function awardToSender(uint32 _index) public {
        require(
            _msgSender() != requests[_index].pickupAddress() &&
                _msgSender() != requests[_index].courierAddress()
        );
        require(
            tokenContract.balanceOf(_msgSender()) >
                requests[_index].value() * 10
        );
        require(requests[_index].step() == steps.Intervention);
        tokenContract.transferFrom(
            address(requests[_index]),
            requests[_index].pickupAddress(),
            requests[_index].value()
        );
        tokenContract.transferFrom(
            address(requests[_index]),
            _msgSender(),
            requests[_index].fees()
        );
        emit Verdict(_index, requests[_index].pickupAddress());
    }

    function awardToCourier(uint32 _index) public {
        require(
            _msgSender() != requests[_index].pickupAddress() &&
                _msgSender() != requests[_index].courierAddress()
        );
        require(
            tokenContract.balanceOf(_msgSender()) >=
                requests[_index].value() * 10
        );
        require(requests[_index].step() == steps.Intervention);
        tokenContract.transferFrom(
            address(requests[_index]),
            requests[_index].courierAddress(),
            requests[_index].value()
        );
        tokenContract.transferFrom(
            address(requests[_index]),
            _msgSender(),
            requests[_index].fees()
        );
        emit Verdict(_index, requests[_index].courierAddress());
    }
}
