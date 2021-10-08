import React from "react";
import { Layer, Source } from "react-map-gl";

const RouteLine = (props) => {
    return (
        <Source type="geojson" data={props.data.routes[0].geometry}>
            <Layer
                {...{
                    id: "directions",
                    type: "line",
                    paint: {
                        "line-color": "#A032CD",
                        "line-width": 5,
                    },
                }}
            />
        </Source>
    );
};

export default RouteLine;
