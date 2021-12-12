import React, { Fragment } from "react";
import FlagIcon from "@material-ui/icons/Flag";
import { v4 as uuidv4 } from "uuid";
import { Marker } from "react-map-gl";
import Image from "next/image";

const RouteMarkers = (props) => {
    return (
        <Fragment>
            <Marker
                latitude={props.viewData.pickup_lat}
                longitude={props.viewData.pickup_lng}
                key={uuidv4()}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <Image src="/images/parcelIcon.png" height={35} width={35} />
            </Marker>
            <Marker
                latitude={props.viewData.destination_lat}
                longitude={props.viewData.destination_lng}
                key={uuidv4()}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <div style={{ color: "#0175AD" }}>
                    <FlagIcon fontSize="large" />
                </div>
            </Marker>
        </Fragment>
    );
};

export default RouteMarkers;
