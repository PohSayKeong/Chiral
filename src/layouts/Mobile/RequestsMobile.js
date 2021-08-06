import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/Map/MapContainer";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Header/HeaderLinks";
import Web3Context from "store/Web3-context";
import Notification from "UI/Notification/Notification";
import MobileBar from "layouts/Mobile/MobileBar";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";
import { useEffect } from "react";

const RequestsMobile = (props) => {
    const [view, setView] = useState(props.view);
    const viewHandler = (data) => {
        setView({ data: data, on: !view.on });
    };
    const web3Ctx = useContext(Web3Context);
    const createdRequests = web3Ctx.handleGetCreatedRequests() || [];
    const acceptedRequests = web3Ctx.handleGetAcceptedRequests() || [];
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        return () => {
            props.saveView(view);
        };
    });

    return (
        <GridContainer direction="column">
            {notification && <Notification status={notification.status} />}
            <GridItem>
                <Header
                    color="primary"
                    rightLinks={<HeaderLinks />}
                    brand="Chiral"
                    icon={<Icon />}
                />
            </GridItem>
            <GridItem>
                <div style={{ height: `calc(0.9 * (100vh - 70px))` }}>
                    <Map
                        data={createdRequests}
                        viewData={view.data}
                        view={viewHandler}
                        resetZoom={view.on}
                        width="100%"
                    />
                </div>
            </GridItem>
            <GridItem>
                <div style={{ height: `calc(0.1 * (100vh - 70px))` }}>
                    <MobileBar
                        viewData={view.data}
                        view={viewHandler}
                        data={createdRequests}
                        myData={acceptedRequests}
                    />
                </div>
            </GridItem>
        </GridContainer>
    );
};

export default RequestsMobile;
