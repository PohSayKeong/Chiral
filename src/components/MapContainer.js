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
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";

function Map(props) {
    const [route, setRoute] = useState();
    const [markers, setMarkers] = useState("");
    const [selectedMarkers, setSelectedMarkers] = useState("");
    const [viewport, setViewport] = useState({
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

    if (!props.viewData && props.data.length !== 0 && markers === "") {
        setMarkers(
            props.data.map((parcel) => (
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
            ))
        );
    }

    useEffect(() => {
        if (props.viewData) {
            const { longitude, latitude, zoom } = new WebMercatorViewport(
                viewportRef.current
            ).fitBounds(
                [
                    [props.viewData.pickup_lng, props.viewData.pickup_lat],
                    [
                        props.viewData.destination_lng,
                        props.viewData.destination_lat,
                    ],
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
                `https://api.mapbox.com/directions/v5/mapbox/driving/${props.viewData.pickup_lng},${props.viewData.pickup_lat};${props.viewData.destination_lng},${props.viewData.destination_lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
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
            setSelectedMarkers(
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
                        <FlagIcon fontSize="large" />
                    </Marker>
                </Fragment>
            );
        }
    }, [props.viewData, props.resetZoom]);

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    return (
        <ReactMapGL
            {...viewport}
            ref={mapRef}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/sknai/ckpgcbh93197s18th45qf7azy"
            width="100%"
            height="100%"
            style={{ zIndex: 0 }}
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
                onViewportChange={handleViewportChange}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                position="top-left"
                countries="SG"
            />
            {markers}
            {selectedMarkers}
            {route}
        </ReactMapGL>
    );
}
export default Map;
