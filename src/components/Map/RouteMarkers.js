import React, { Fragment } from "react";
import FlagIcon from "@material-ui/icons/Flag";
import { v4 as uuidv4 } from "uuid";
import { Marker } from "react-map-gl";
import { ReactComponent as Icon } from "assets/images/parcelIcon.svg";

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
                <Icon />
            </Marker>
            <Marker
                latitude={props.viewData.destination_lat}
                longitude={props.viewData.destination_lng}
                key={uuidv4()}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <div style={{ color: "#FFA726" }}>
                    <FlagIcon fontSize="large" />
                </div>
            </Marker>
        </Fragment>
    );
};

export default RouteMarkers;
