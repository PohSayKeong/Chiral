import React from "react";
import { useDispatch } from "react-redux";
import { requestActions } from "store/request-slice";
import { v4 as uuidv4 } from "uuid";
import { Marker } from "react-map-gl";
import Image from "next/image";

const ParcelMarkers = (props) => {
    const dispatch = useDispatch();
    return props.data.map((parcel) => (
        <Marker
            latitude={parcel.pickup_lat}
            longitude={parcel.pickup_lng}
            key={uuidv4()}
            offsetLeft={-20}
            offsetTop={-10}
        >
            <div
                onClick={() => dispatch(requestActions.setViewData(parcel))}
                style={{ cursor: "pointer" }}
            >
                <Image src="/images/parcelIcon.png" height={35} width={35} />
            </div>
        </Marker>
    ));
};

export default ParcelMarkers;
