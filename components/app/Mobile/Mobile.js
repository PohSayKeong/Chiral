import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/app/Map/MapContainer";
import Explore from "./Explore/Explore";
import GridContainer from "UI/Grid/GridContainer";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinks";
import Notification from "UI/Notification/Notification";
import RequestForm from "components/app/RequestForm/RequestForm";
import RequestsContainer from "components/app/Requests/RequestsContainer";
import DeliveriesContainer from "components/app/MyDeliveries/DeliveriesContainer";
import mobileStyles from "./mobileStyles";
import { makeStyles } from "@material-ui/core/styles";
import MobileBar from "./MobileBar";
import Chatbox from "components/app/Chat/Chatbox";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import Image from "next/image";

const useStyles = makeStyles(mobileStyles);

const Mobile = () => {
    const notification = useSelector((state) => state.ui.notification);
    const view = useSelector((state) => state.request.viewData);
    const chat = useSelector((state) => state.chat.chatInfo);
    const classes = useStyles();
    const [tab, setTab] = useState("explore");
    useEffect(() => {
        if (view) {
            setTab("explore");
        }
    }, [view]);
    const showBar = useMediaQuery({
        query: "(min-height: 530px)",
    });

    return (
        <GridContainer direction="column" style={{ height: "100vh" }}>
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
                notification={notification ? notification.status : ""}
            />
            <div
                className={classNames(
                    classes.contentBlock,
                    !showBar ? classes.noBar : ""
                )}
                id="content-block"
            >
                {chat && <Chatbox info={chat} />}
                {tab === "explore" ? (
                    <Explore setTab={setTab} />
                ) : (
                    <div className={classes.content}>
                        {tab === "form" && <RequestForm />}
                        {tab === "requests" && <RequestsContainer />}
                        {tab === "deliveries" && <DeliveriesContainer />}
                    </div>
                )}
                <Map />
            </div>
            {showBar && <MobileBar tab={tab} setTab={setTab} />}
        </GridContainer>
    );
};

export default Mobile;
