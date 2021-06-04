import React, { useState } from "react";
import LocationContext from "./location-context";

const LocationProvider = (props) => {
    const [latlng, setLatLng] = useState({ lat: "", lng: "" });

    const setCurrent = (lat, lng) => {
        setLatLng((prevLatLng) => {
            return { ...prevLatLng, lat: lat, lng: lng };
        });
    };

    const locationContext = {
        lat: latlng.lat,
        lng: latlng.lng,
        setCurrent: setCurrent,
    };

    return (
        <LocationContext.Provider value={locationContext}>
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationProvider;
