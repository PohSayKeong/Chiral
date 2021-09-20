import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/Map/MapContainer";
import SideBar from "layouts/App/Desktop/SideBar";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinksApp";
import Notification from "UI/Notification/Notification";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";
import Chatbox from "components/Chat/Chatbox";

const Desktop = () => {
    const notification = useSelector((state) => state.ui.notification);
    const chat = useSelector((state) => state.chat.chatInfo);

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
                    <SideBar />
                </GridItem>
                <GridItem md={6}>
                    {chat && <Chatbox info={chat} />}
                    <Map />
                </GridItem>
            </GridContainer>
        </Fragment>
    );
};

export default Desktop;
