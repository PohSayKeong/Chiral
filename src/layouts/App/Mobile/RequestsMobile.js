import React from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/Map/MapContainer";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Header/HeaderLinksApp";
import Notification from "UI/Notification/Notification";
import MobileBar from "layouts/App/Mobile/MobileBar";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";

const RequestsMobile = (props) => {
    const notification = useSelector((state) => state.ui.notification);

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
                    <Map width="100%" />
                </div>
            </GridItem>
            <GridItem>
                <div style={{ height: `calc(0.1 * (100vh - 70px))` }}>
                    <MobileBar />
                </div>
            </GridItem>
        </GridContainer>
    );
};

export default RequestsMobile;
