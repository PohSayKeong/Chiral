import React from "react";

// @material-ui/icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoAreaInterventions from "UI/Custom/InfoAreaRequests/InfoAreaInterventions";

const validUnitDetail = (detail) => {
    if (detail !== "0" && detail !== "") {
        return true;
    } else return false;
};

const InfoCard = (props) => {
    const {
        pickupAddress,
        courierAddress,
        pickup,
        destination,
        weight,
        pickup_floor,
        pickup_unit,
        destination_floor,
        destination_unit,
        requestDistance,
        identifier,
        value,
        fees,
        distanceToUser,
    } = props.data;

    let icon;
    switch (weight) {
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

    const pickupDetails = `${
        validUnitDetail(pickup_floor) ? `#${pickup_floor}` : ""
    }${validUnitDetail(pickup_unit) ? `-${pickup_unit}` : ""}`;

    const destinationDetails = `${
        validUnitDetail(destination_floor) ? `#${destination_floor}` : ""
    }${validUnitDetail(destination_unit) ? `-${destination_unit}` : ""}`;

    let description = {
        pickupAddress: pickupAddress,
        courierAddress: courierAddress,
        pickup: pickup,
        destination: destination,
        distance: requestDistance + "KM",
    };
    if (props.details) {
        description.pickupDetails = pickupDetails;
        description.destinationDetails = destinationDetails;
    }

    return (
        <InfoAreaInterventions
            title={identifier}
            description={description}
            icon={icon}
            iconColor="primary"
            value={value}
            fees={fees}
            distance={distanceToUser}
        />
    );
};
export default InfoCard;
