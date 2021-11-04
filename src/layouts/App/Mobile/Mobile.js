import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/Map/MapContainer";
import Explore from "./Explore/Explore";
import GridContainer from "UI/Grid/GridContainer";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinksApp";
import Notification from "UI/Notification/Notification";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";
import RequestForm from "components/RequestForm/RequestForm";
import RequestsContainer from "components/Requests/RequestsContainer";
import DeliveriesContainer from "components/MyDeliveries/DeliveriesContainer";
import mobileStyles from "./mobileStyles";
import { makeStyles } from "@material-ui/core/styles";
import MobileBar from "./MobileBar";
import Chatbox from "components/Chat/Chatbox";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

const useStyles = makeStyles(mobileStyles);

const Mobile = () => {
    const notification = useSelector((state) => state.ui.notification);
    const view = useSelector((state) => state.request.viewData);
    const chat = useSelector((state) => state.chat.chatInfo);
    const classes = useStyles();
    const [tab, setTab] = useState("explore");
    useEffect(() => {
        setTab("explore");
    }, [view]);
    const showBar = useMediaQuery({
        query: "(min-height: 600px)",
    });

    return (
        <GridContainer direction="column" style={{ height: "100vh" }}>
            {notification && <Notification status={notification.status} />}
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
                icon={<Icon />}
                notification={notification.status}
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
