import React from "react";

const LocationContext = React.createContext({
    lat: "",
    lng: "",
    setCurrent: () => {},
});

export default LocationContext;
