const PastDeliveryInfo = (props) => {
    const {
        pickup,
        destination,
        pickup_floor,
        pickup_unit,
        destination_floor,
        destination_unit,
        requestDistance,
    } = props.data;
    const pickupDetails = `${pickup_floor !== "0" ? `#${pickup_floor}` : ""}${
        pickup_unit !== "0" ? `-${pickup_unit}` : ""
    }`;

    const destinationDetails = `${
        destination_floor !== "0" ? `#${destination_floor}` : ""
    }${destination_unit !== "0" ? `-${destination_unit}` : ""}`;

    return (
        <>
            <p>
                <b>FROM:</b> {pickup} {pickupDetails}
                <br />
                <br />
                <b>TO:</b> {destination} {destinationDetails}
                <br />
            </p>
            <hr style={{ width: "100%" }} />
            <p>
                <b>DISTANCE:</b> {requestDistance} KM
            </p>
        </>
    );
};

export default PastDeliveryInfo;
