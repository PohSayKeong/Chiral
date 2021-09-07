import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
// core components
import Button from "UI/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/popoverStyles.js";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import RequestForm from "components/RequestForm/RequestForm";
import barStyles from "./MobileBarStyles.js";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PersonIcon from "@material-ui/icons/Person";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import RequestsContainer from "components/Requests/RequestsContainer.js";
import DeliveriesContainer from "components/MyDeliveries/DeliveriesContainer.js";

const useStyles = makeStyles({ ...styles, ...barStyles });

export default function MobileBar() {
    const classes = useStyles();
    const [anchorNewRequest, setNewRequest] = useState(null);
    const [anchorDeliver, setDeliver] = useState(null);
    const [anchorMyDeliveries, setMyDeliveries] = useState(null);
    const view = useSelector((state) => state.request.viewData);
    useEffect(() => {
        setNewRequest(null);
        setDeliver(null);
        setMyDeliveries(null);
    }, [view]);

    return (
        <GridContainer className="Grid">
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setNewRequest(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <CreateIcon />
                        <br />
                        New Request
                    </p>
                </Button>
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={Boolean(anchorNewRequest)}
                    onClose={() => {
                        setNewRequest(null);
                    }}
                    onOpen={() => {}}
                >
                    {<RequestForm />}
                </SwipeableDrawer>
            </GridItem>
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setDeliver(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <LocalShippingIcon />
                        <br />
                        Deliver
                    </p>
                </Button>
                <Popover
                    classes={{
                        paper: classes.popover,
                    }}
                    open={Boolean(anchorDeliver)}
                    anchorEl={anchorDeliver}
                    onClose={() => setDeliver(null)}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            overflow: "auto",
                            height: "40vh",
                        }}
                    >
                        <RequestsContainer />
                    </div>
                </Popover>
            </GridItem>
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setMyDeliveries(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <PersonIcon />
                        <br />
                        My Deliveries
                    </p>
                </Button>
                <Popover
                    classes={{
                        paper: classes.popover,
                    }}
                    open={Boolean(anchorMyDeliveries)}
                    anchorEl={anchorMyDeliveries}
                    onClose={() => setMyDeliveries(null)}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            overflow: "auto",
                            height: "20vh",
                        }}
                    >
                        <DeliveriesContainer />
                    </div>
                </Popover>
            </GridItem>
        </GridContainer>
    );
}
