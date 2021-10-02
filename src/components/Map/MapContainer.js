import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMapGL, {
    NavigationControl,
    WebMercatorViewport,
    FlyToInterpolator,
    GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { easeCubic } from "d3-ease";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useCallback } from "react";
import RouteLine from "./RouteLine";
import RouteMarkers from "./RouteMarkers";
import ParcelMarkers from "./ParcelMarkers";
import { v4 as uuidv4 } from "uuid";
import { userActions } from "store/user-slice";

function Map() {
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
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const viewData = useSelector((state) => state.request.viewData);
    const dispatch = useDispatch();

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
        dispatch(
            userActions.setLocation({
                lat: data.coords.latitude,
                lng: data.coords.longitude,
            })
        );
    };

    const zoomToFitView = useCallback(async () => {
        if (viewData && viewportRef.current.latitude !== 1.352083) {
            const { longitude, latitude, zoom } = new WebMercatorViewport(
                viewportRef.current
            ).fitBounds(
                [
                    [viewData.pickup_lng, viewData.pickup_lat],
                    [viewData.destination_lng, viewData.destination_lat],
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
                `https://api.mapbox.com/directions/v5/mapbox/driving/${viewData.pickup_lng},${viewData.pickup_lat};${viewData.destination_lng},${viewData.destination_lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
            )
                .then((resp) => resp.json())
                .then((data) => {
                    setRoute(<RouteLine data={data} />);
                });
            setSelectedMarkers(<RouteMarkers viewData={viewData} />);
        }
    }, [viewData]);

    useEffect(() => {
        viewportRef.current = viewport;
    });
    //Place markers of available requests
    useEffect(() => {
        setMarkers(<ParcelMarkers data={availableRequests} key={uuidv4()} />);
    }, [availableRequests]);

    //Change map to fit new request selected
    useEffect(() => {
        zoomToFitView();
    }, [viewData, zoomToFitView]);

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
