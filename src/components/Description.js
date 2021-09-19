import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/infoRequestsStyle";

const useStyles = makeStyles(styles);

const Description = (props) => {
    const classes = useStyles();
    const [pickup, destination, distance, pickupDetails, destinationDetails] = props.content.split("!@#");
    if (pickupDetails && destinationDetails) return (
        <div>
            <p className={classes.description}>FROM: {pickup} {pickupDetails}</p>
            <p className={classes.description}>TO: {destination} {destinationDetails}</p>
            <p className={classes.description}>DISTANCE: {distance}</p>
        </div>
    );
    else return (
        <div>
            <p className={classes.description}><b>FROM:</b> {pickup}</p>
            <p className={classes.description}><b>TO:</b> {destination}</p>
            <p className={classes.description}><b>DISTANCE:</b> {distance}</p>
        </div>
    );
};

export default Description;