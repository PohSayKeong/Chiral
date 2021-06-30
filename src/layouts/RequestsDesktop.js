import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/MapContainer";
import SideBar from "components/SideBar";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Header/HeaderLinks";
import Web3Context from "store/Web3-context";
import Notification from "UI/Notification/Notification";

const RequestsDesktop = () => {
    const [view, setView] = useState({ on: false });
    const viewHandler = (data) => {
        setView({ data: data, on: !view.on });
    };
    const web3Ctx = useContext(Web3Context);
    useEffect(() => {
        web3Ctx.web3Setup();
        web3Ctx.getRequests();
    }, [web3Ctx]);
    const createdRequests = web3Ctx.getCreatedRequests() || [];
    const acceptedRequests = web3Ctx.getAcceptedRequests() || [];
    const notification = useSelector((state) => state.ui.notification);

    return (
        <div>
            {notification && <Notification status={notification.status} />}
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
            />
            <GridContainer className="Grid">
                <GridItem xs={12} md={6}>
                    <SideBar
                        data={createdRequests}
                        myData={acceptedRequests}
                        view={viewHandler}
                    />
                </GridItem>
                <GridItem item xs={false} md={6}>
                    <Map
                        data={createdRequests}
                        view={view.data}
                        resetZoom={view.on}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default RequestsDesktop;
