import React, { Fragment, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import ReactMapGL, {
    Marker,
    NavigationControl,
    WebMercatorViewport,
    FlyToInterpolator,
    Layer,
    Source,
} from "react-map-gl";
import LocationContext from "../store/location-context";
import { ReactComponent as Icon } from "../assets/images/parcelIcon.svg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";
import { easeCubic } from "d3-ease";

function Map(props) {
    const locationCtx = useContext(LocationContext);
    const [route, setRoute] = useState();
    const [markers, setMarkers] = useState();
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 0,
        longitude: 0,
        zoom: 14,
    });
    const viewportRef = useRef(viewport);
    const locationCtxRef = useRef(locationCtx);

    const navControlStyle = {
        right: 10,
        top: 10,
    };

    useEffect(() => {
        viewportRef.current = viewport;
        locationCtxRef.current = locationCtx;
    });

    useEffect(() => {
        const id = navigator.geolocation.watchPosition(
            function (position) {
                setViewport((prevViewport) => {
                    return {
                        ...prevViewport,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                });
                locationCtxRef.current.setCurrent(
                    position.coords.latitude,
                    position.coords.longitude
                );
                if (position.coords.accuracy < 2000) {
                    navigator.geolocation.clearWatch(id);
                }
            },
            (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 200,
            }
        );
    }, []);

    if (!props.view && !markers) {
        setMarkers(
            props.data.map((parcel) => (
                <Marker
                    latitude={parcel.pickup.lat}
                    longitude={parcel.pickup.lng}
                    key={parcel.name}
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
                    [props.view.pickup.lng, props.view.pickup.lat],
                    [props.view.destination.lng, props.view.destination.lat],
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
                `https://api.mapbox.com/directions/v5/mapbox/walking/${props.view.pickup.lng},${props.view.pickup.lat};${props.view.destination.lng},${props.view.destination.lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
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
                        latitude={props.view.pickup.lat}
                        longitude={props.view.pickup.lng}
                        key={props.view.name + " Pickup"}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <Icon />
                    </Marker>
                    <Marker
                        latitude={props.view.destination.lat}
                        longitude={props.view.destination.lng}
                        key={props.view.name + " Destination"}
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
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/sknai/ckpgcbh93197s18th45qf7azy"
        >
            <NavigationControl style={navControlStyle} />
            {locationCtx.lat && (
                <Marker
                    latitude={locationCtx.lat}
                    longitude={locationCtx.lng}
                    key="currentPosition"
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <LocationOnIcon fontSize="large" />
                </Marker>
            )}
            {markers}
            {route}
        </ReactMapGL>
    );
}
export default Map;
