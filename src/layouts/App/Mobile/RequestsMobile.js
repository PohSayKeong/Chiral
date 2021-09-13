import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";
import Map from "components/Map/MapContainer";
import GridContainer from "UI/Grid/GridContainer";
import Header from "UI/Header/Header";
import HeaderLinks from "UI/Header/HeaderLinksApp";
import Notification from "UI/Notification/Notification";
import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";
import RequestForm from "components/RequestForm/RequestForm";
import RequestsContainer from "components/Requests/RequestsContainer";
import DeliveriesContainer from "components/MyDeliveries/DeliveriesContainer";
import mobileStyles from "./mobileStyles";
import { makeStyles } from "@material-ui/core/styles";
import MobileBar from "./MobileBar";

const useStyles = makeStyles(mobileStyles);

const RequestsMobile = () => {
    const notification = useSelector((state) => state.ui.notification);
    const view = useSelector((state) => state.request.viewData);
    const classes = useStyles();
    const [tab, setTab] = useState("explore");
    useEffect(() => {
        setTab("explore");
    }, [view]);

    return (
        <GridContainer direction="column" style={{ height: "100vh" }}>
            {notification && <Notification status={notification.status} />}
            <Header
                color="primary"
                rightLinks={<HeaderLinks />}
                brand="Chiral"
                icon={<Icon />}
            />
            <div className={classes.contentBlock}>
                {tab === "explore" ? (
                    <Map />
                ) : (
                    <div className={classes.content}>
                        {tab === "form" && <RequestForm />}
                        {tab === "requests" && <RequestsContainer />}
                        {tab === "deliveries" && <DeliveriesContainer />}
                    </div>
                )}
            </div>
            <MobileBar tab={tab} setTab={setTab} />
        </GridContainer>
    );
};

export default RequestsMobile;
