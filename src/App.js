import React, { useContext, useEffect, useState } from "react";

import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "./components/MapContainer";
import SideBar from "./components/SideBar";
import GridContainer from "./UI/Grid/GridContainer";
import GridItem from "./UI/Grid/GridItem";
import Header from "./UI/Header/Header";
import HeaderLinks from "./UI/Header/HeaderLinks";
import Web3Context from "./store/Web3-context";

const App = () => {
    const [view, setView] = useState({ on: false });
    const viewHandler = (data) => {
        setView({ data: data, on: !view.on });
    };
    const web3Ctx = useContext(Web3Context);
    useEffect(() => {
        web3Ctx.web3Setup();
        web3Ctx.getItems();
    }, [web3Ctx]);
    const createdItems = web3Ctx.getCreatedItems() || [];
    const acceptedItem = web3Ctx.getAcceptedItems() || [];

    return (
        <div className="App">
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
            />
            <GridContainer className="Grid">
                <GridItem xs={6}>
                    <SideBar
                        data={createdItems}
                        myData={acceptedItem}
                        view={viewHandler}
                    />
                </GridItem>
                <GridItem item xs={6}>
                    <Map
                        data={createdItems}
                        view={view.data}
                        resetZoom={view.on}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default App;
