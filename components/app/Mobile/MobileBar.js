import React, { Fragment } from "react";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Button from "UI/CustomButtons/Button.js";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PersonIcon from "@material-ui/icons/Person";
import ExploreIcon from "@material-ui/icons/Explore";
import mobileStyles from "./mobileStyles";
import { makeStyles } from "@material-ui/core/styles";
import Info from "UI/Typography/Info";

const useStyles = makeStyles(mobileStyles);

const MobileBar = (props) => {
    const { tab, setTab } = { ...props };
    const classes = useStyles();
    const explore = (
        <Fragment>
            <ExploreIcon />
            <br />
            Explore
        </Fragment>
    );
    const form = (
        <Fragment>
            <CreateIcon />
            <br />
            New Request
        </Fragment>
    );
    const requests = (
        <Fragment>
            <LocalShippingIcon />
            <br />
            Deliver
        </Fragment>
    );
    const deliveries = (
        <Fragment>
            <PersonIcon />
            <br />
            My Deliveries
        </Fragment>
    );
    return (
        <div className={classes.mobileBar}>
            <GridContainer className="Grid">
                <GridItem xs={3}>
                    <Button
                        onClick={() => setTab("explore")}
                        className={classes.mobileBarButton}
                        color="primary"
                    >
                        {tab === "explore" ? (
                            <Info>{explore}</Info>
                        ) : (
                            <p>{explore}</p>
                        )}
                    </Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button
                        onClick={() => setTab("form")}
                        className={classes.mobileBarButton}
                        color="primary"
                    >
                        {tab === "form" ? <Info>{form}</Info> : <p>{form}</p>}
                    </Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button
                        onClick={() => setTab("requests")}
                        className={classes.mobileBarButton}
                        color="primary"
                    >
                        {tab === "requests" ? (
                            <Info>{requests}</Info>
                        ) : (
                            <p>{requests}</p>
                        )}
                    </Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button
                        onClick={() => setTab("deliveries")}
                        className={classes.mobileBarButton}
                        color="primary"
                    >
                        {tab === "deliveries" ? (
                            <Info>{deliveries}</Info>
                        ) : (
                            <p>{deliveries}</p>
                        )}
                    </Button>
                </GridItem>
            </GridContainer>
        </div>
    );
};

export default MobileBar;
