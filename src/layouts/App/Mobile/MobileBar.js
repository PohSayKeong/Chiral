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
import Warning from "UI/Typography/Warning";

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
                            <Warning>{explore}</Warning>
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
                        {tab === "form" ? (
                            <Warning>{form}</Warning>
                        ) : (
                            <p>{form}</p>
                        )}
                    </Button>
                </GridItem>
                <GridItem xs={3}>
                    <Button
                        onClick={() => setTab("requests")}
                        className={classes.mobileBarButton}
                        color="primary"
                    >
                        {tab === "requests" ? (
                            <Warning>{requests}</Warning>
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
                            <Warning>{deliveries}</Warning>
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
