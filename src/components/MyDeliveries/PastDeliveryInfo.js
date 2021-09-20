import React, { Fragment, useEffect, useState } from "react";
import fetchAddress from "helpers/fetchAddress";
import { fetchDistance } from "helpers/fetchDistance";

const PastDeliveryInfo = (props) => {
    const [values, setValues] = useState({
        pickup: "Loading",
        destination: "Loading",
        requestDistance: "Loading",
    });
    const {
        pickup_lng,
        pickup_lat,
        destination_lng,
        destination_lat,
        pickup_floor,
        pickup_unit,
        destination_floor,
        destination_unit,
    } = props.data;
    const pickupDetails = `${pickup_floor !== "0" ? `#${pickup_floor}` : ""}${
        pickup_unit !== "0" ? `-${pickup_unit}` : ""
    }`;

    const destinationDetails = `${
        destination_floor !== "0" ? `#${destination_floor}` : ""
    }${destination_unit !== "0" ? `-${destination_unit}` : ""}`;

    useEffect(() => {
        const fetchPickup = fetchAddress(pickup_lng, pickup_lat);
        const fetchDestination = fetchAddress(destination_lng, destination_lat);
        const fetchRequestDistance = fetchDistance(
            pickup_lng,
            pickup_lat,
            destination_lng,
            destination_lat
        );
        Promise.all([fetchPickup, fetchDestination, fetchRequestDistance]).then(
            ([pickup, destination, requestDistance]) => {
                setValues({ pickup, destination, requestDistance });
            }
        );
    }, [pickup_lng, pickup_lat, destination_lng, destination_lat]);
    return (
        <Fragment>
            <p>
                <b>FROM:</b> {values.pickup} {pickupDetails}
                <br />
                <br />
                <b>TO:</b> {values.destination} {destinationDetails}
                <br />
            </p>
            <hr style={{ width: "100%" }} />
            <p>
                <b>DISTANCE:</b> {values.requestDistance} KM
            </p>
        </Fragment>
    );
};

export default PastDeliveryInfo;
