import React, { useState } from "react";

// @material-ui/icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoArea from "UI/InfoArea/InfoArea";
import useAsync from "hooks/use-async";
import fetchAddress from "helpers/fetchAddress";

const InfoCard = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");

    // convert latlong to address
    const fetchPickup = () =>
        fetchAddress(props.data.pickup_lng, props.data.pickup_lat);
    const fetchDestination = () =>
        fetchAddress(props.data.destination_lng, props.data.destination_lat);
    useAsync(fetchPickup, setOrigin);
    useAsync(fetchDestination, setDestination);

    let icon;
    switch (props.data._weight) {
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
        props.data.pickup_floor !== "0" ? `#${props.data.pickup_floor}` : ""
    }${props.data.pickup_unit !== "0" ? `-${props.data.pickup_unit}` : ""}`;

    const destinationDetails = `${
        props.data.destination_floor !== "0"
            ? `#${props.data.destination_floor}`
            : ""
    }${
        props.data.destination_unit !== "0"
            ? `-${props.data.destination_unit}`
            : ""
    }`;

    let description;
    if (props.details) {
        description = `${origin} ${pickupDetails} -> ${destination} ${destinationDetails}`;
    } else {
        description = `${origin} -> ${destination}`;
    }

    return (
        <InfoArea
            title={props.data.identifier}
            description={description}
            icon={icon}
            iconColor="primary"
            value={props.data.value}
        />
    );
};
export default InfoCard;
