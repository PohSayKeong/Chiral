import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/app/Map/MapContainer";
import SideBar from "./SideBar";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinks";
import Notification from "UI/Notification/Notification";
import Chatbox from "components/app/Chat/Chatbox";
import Image from "next/image";

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
                icon={
                    <Image
                        src="/images/chiralIcon.png"
                        height={50}
                        width={80}
                    />
                }
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
