import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Marker } from "react-map-gl";
import { ReactComponent as Icon } from "assets/images/parcelIcon.svg";

const ParcelMarkers = (props) => {
    return props.data.map((parcel) => (
        <Marker
            latitude={parcel.pickup_lat}
            longitude={parcel.pickup_lng}
            key={uuidv4()}
            offsetLeft={-20}
            offsetTop={-10}
        >
            <Icon
                onClick={() => props.view(parcel)}
                style={{ cursor: "pointer" }}
            />
        </Marker>
    ));
};

export default ParcelMarkers;
