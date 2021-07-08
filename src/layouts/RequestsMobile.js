import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/MapContainer";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Header/HeaderLinks";
import Web3Context from "store/Web3-context";
import Notification from "UI/Notification/Notification";
import MobileBar from "components/MobileBar";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";

const RequestsMobile = () => {
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
                            view={viewHandler}
                            data={createdRequests}
                            myData={acceptedRequests}
                        />
                    </div>
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default RequestsMobile;
