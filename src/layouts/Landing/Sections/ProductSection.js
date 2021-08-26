import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
// core components
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";
import InfoArea from "UI/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>Goodbye Middleman</h2>
                    <h5 className={classes.description}>
                        Stop paying exorbitant fees to the corporations.
                        <br /> A delivery should be between you and the courier,
                        no one else.
                    </h5>
                </GridItem>
            </GridContainer>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="Secure"
                            description="Full compensation if delivery is mishandled."
                            icon={VerifiedUser}
                            iconColor="success"
                            vertical
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="Public"
                            description="Transactions made on the blockchain"
                            icon={LinearScaleIcon}
                            iconColor="primary"
                            vertical
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <InfoArea
                            title="No Platform Fees"
                            description="What you pay is what the courier gets"
                            icon={MoneyOffIcon}
                            iconColor="info"
                            vertical
                        />
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
