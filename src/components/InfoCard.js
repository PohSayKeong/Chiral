import React, { useState } from "react";

// @material-ui/icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoAreaRequests from "UI/InfoArea/InfoAreaRequests";
import useAsync from "hooks/use-async";
import fetchAddress from "helpers/fetchAddress";
import { fetchDistance } from "helpers/fetchDistance";

const InfoCard = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");
    const [requestDistance, setrequestDistance] = useState("Loading");
    const { pickup_lng, pickup_lat, destination_lng, destination_lat } = {
        ...props.data,
    };

    // convert latlong to address
    const fetchPickup = () => fetchAddress(pickup_lng, pickup_lat);
    const fetchDestination = () =>
        fetchAddress(destination_lng, destination_lat);
    const fetchRequestDistance = () =>
        fetchDistance(pickup_lng, pickup_lat, destination_lng, destination_lat);
    useAsync(fetchPickup, setOrigin);
    useAsync(fetchDestination, setDestination);
    useAsync(fetchRequestDistance, setrequestDistance);

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
        description = `${origin} ${pickupDetails} -> ${destination} ${destinationDetails} (${requestDistance} KM)`;
    } else {
        description = `${origin} -> ${destination} (${requestDistance} KM)`;
    }

    return (
        <InfoAreaRequests
            title={props.data.identifier}
            description={description}
            icon={icon}
            iconColor="primary"
            value={props.data.value}
            distance={props.data.distanceToUser}
        />
    );
};
export default InfoCard;
