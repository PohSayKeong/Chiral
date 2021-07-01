import React, { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import ReactMapGL, {
    Marker,
    NavigationControl,
    WebMercatorViewport,
    FlyToInterpolator,
    Layer,
    Source,
    GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { ReactComponent as Icon } from "../assets/images/parcelIcon.svg";
import FlagIcon from "@material-ui/icons/Flag";
import { easeCubic } from "d3-ease";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Map(props) {
    const [route, setRoute] = useState();
    const [markers, setMarkers] = useState("");
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 1.352083,
        longitude: 103.819839,
        zoom: 10,
    });
    const viewportRef = useRef(viewport);
    const mapRef = useRef();

    const navControlStyle = {
        right: 10,
        top: 50,
    };

    const geolocateControlStyle = {
        right: 10,
        top: 10,
    };

    const updateLocation = (data) => {
        viewportRef.current.latitiude = data.coords.latitude;
        viewportRef.current.longitude = data.coords.longitude;
    };

    useEffect(() => {
        viewportRef.current = viewport;
    });

    if (!props.view && props.data.length !== 0 && markers === "") {
        setMarkers(
            props.data.map((parcel) => (
                <Marker
                    latitude={parcel.pickup_lat}
                    longitude={parcel.pickup_lng}
                    key={parcel.identifier}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <Icon />
                </Marker>
            ))
        );
    }

    useEffect(() => {
        if (props.view) {
            const { longitude, latitude, zoom } = new WebMercatorViewport(
                viewportRef.current
            ).fitBounds(
                [
                    [props.view.pickup_lng, props.view.pickup_lat],
                    [props.view.destination_lng, props.view.destination_lat],
                ],
                {
                    padding: 20,
                    offset: [0, -100],
                }
            );
            setViewport({
                ...viewportRef.current,
                longitude,
                latitude,
                zoom,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: easeCubic,
            });
            fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${props.view.pickup_lng},${props.view.pickup_lat};${props.view.destination_lng},${props.view.destination_lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
            )
                .then((resp) => resp.json())
                .then((data) => {
                    setRoute(
                        <Source type="geojson" data={data.routes[0].geometry}>
                            <Layer
                                {...{
                                    id: "directions",
                                    type: "line",
                                    paint: {
                                        "line-color": "#A032CD",
                                        "line-width": 3,
                                        "line-opacity": 0.75,
                                    },
                                }}
                            />
                        </Source>
                    );
                });
            setMarkers(
                <Fragment>
                    <Marker
                        latitude={props.view.pickup_lat}
                        longitude={props.view.pickup_lng}
                        key={props.view.name + " Pickup"}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <Icon />
                    </Marker>
                    <Marker
                        latitude={props.view.destination_lat}
                        longitude={props.view.destination_lng}
                        key={props.view.identifier + " Destination"}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <FlagIcon fontSize="large" />
                    </Marker>
                </Fragment>
            );
        }
    }, [props.view, props.resetZoom]);

    return (
        <ReactMapGL
            {...viewport}
            ref={mapRef}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/sknai/ckpgcbh93197s18th45qf7azy"
        >
            <NavigationControl style={navControlStyle} showCompass={false} />
            <GeolocateControl
                style={geolocateControlStyle}
                positionOptions={{ enableHighAccuracy: true }}
                onGeolocate={updateLocation}
                auto
            />
            <Geocoder
                mapRef={mapRef}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                position="top-left"
                countries="SG"
            />
            {markers}
            {route}
        </ReactMapGL>
    );
}
export default Map;
