import React, { useState } from "react";

import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "./components/MapContainer";
import SideBar from "./components/SideBar";
import GridContainer from "./UI/Grid/GridContainer";
import GridItem from "./UI/Grid/GridItem";
import Header from "./UI/Header/Header";
import HeaderLinks from "./UI/Header/HeaderLinks";
import LocationProvider from "./store/LocationProvider";
import data from "./data.json";

const App = () => {
    const [view, setView] = useState({ on: false });
    const [requests, setRequests] = useState(data);
    const viewHandler = (data) => {
        setView({ data: data, on: !view.on });
    };
    const updateData = (newRequest) => {
        setRequests(requests.concat([newRequest]));
    };

    return (
        <div className="App">
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
            />
            <LocationProvider>
                <GridContainer className="Grid">
                    <GridItem xs={6}>
                        <SideBar
                            data={requests}
                            view={viewHandler}
                            updateData={updateData}
                        />
                    </GridItem>
                    <GridItem item xs={6}>
                        <Map
                            data={requests}
                            view={view.data}
                            resetZoom={view.on}
                        />
                    </GridItem>
                </GridContainer>
            </LocationProvider>
        </div>
    );
};

export default App;
