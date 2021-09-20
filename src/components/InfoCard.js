import React from "react";

// @material-ui/icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoAreaRequests from "UI/Custom/InfoAreaRequests/InfoAreaRequests";

const InfoCard = (props) => {
    const {
        pickup,
        destination,
        _weight,
        pickup_floor,
        pickup_unit,
        destination_floor,
        destination_unit,
        requestDistance,
        identifier,
        value,
        distanceToUser,
    } = props.data;

    let icon;
    switch (_weight) {
        case "0":
            icon = DirectionsWalkIcon;
            break;
        case "1":
            icon = MotorcycleIcon;
            break;
        case "2":
            icon = LocalShippingIcon;
            break;
        default:
            icon = LocalShippingIcon;
    }

    const pickupDetails = `${pickup_floor !== "0" ? `#${pickup_floor}` : ""}${
        pickup_unit !== "0" ? `-${pickup_unit}` : ""
    }`;

    const destinationDetails = `${
        destination_floor !== "0" ? `#${destination_floor}` : ""
    }${destination_unit !== "0" ? `-${destination_unit}` : ""}`;

    let description = {
        pickup: pickup,
        destination: destination,
        distance: requestDistance + "KM",
    };
    if (props.details) {
        description.pickupDetails = pickupDetails;
        description.destinationDetails = destinationDetails;
    }

    return (
        <InfoAreaRequests
            title={identifier}
            description={description}
            icon={icon}
            iconColor="primary"
            value={value}
            distance={distanceToUser}
        />
    );
};
export default InfoCard;
