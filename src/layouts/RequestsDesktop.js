import React, { useContext, useState, Fragment } from "react";
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
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";

const RequestsDesktop = () => {
    const [view, setView] = useState({ on: false });
    const viewHandler = (data) => {
        setView({ data: data, on: !view.on });
    };
    const web3Ctx = useContext(Web3Context);
    const createdRequests = web3Ctx.handleGetCreatedRequests() || [];
    const acceptedRequests = web3Ctx.handleGetAcceptedRequests() || [];
    const notification = useSelector((state) => state.ui.notification);

    return (
        <Fragment>
            {notification && <Notification status={notification.status} />}
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
                icon={<Icon />}
            />
            <GridContainer spacing={1}>
                <GridItem md={6}>
                    <SideBar
                        data={createdRequests}
                        myData={acceptedRequests}
                        viewData={view.data}
                        view={viewHandler}
                    />
                </GridItem>
                <GridItem md={6}>
                    <Map
                        data={createdRequests}
                        viewData={view.data}
                        view={viewHandler}
                        resetZoom={view.on}
                    />
                </GridItem>
            </GridContainer>
        </Fragment>
    );
};

export default RequestsDesktop;
