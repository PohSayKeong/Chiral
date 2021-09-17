import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "UI/Header/Header.js";
import Footer from "UI/Footer/Footer.js";
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";
import Button from "UI/CustomButtons/Button.js";
import HeaderLinks from "UI/Header/HeaderLinksLanding.js";
import Parallax from "UI/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import Carousel from "UI/Carousel/Carousel";

import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Chiral"
                icon={<Icon />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "primary",
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/images/landing-bg.jpg")}>
                <GridContainer className={classes.container}>
                    <GridItem xs={12} sm={12} md={6} className={classes.intro}>
                        <h1 className={classes.title}>
                            The Future of Deliveries
                        </h1>
                        <h4 className={classes.description}>
                            Full peer to peer delivery at your fingertips.
                            <br /> No more waiting around, you deliver when you
                            want and what you want.
                        </h4>
                        <br />
                        <Button
                            color="danger"
                            size="lg"
                            href="https://www.instagram.com/tv/CRtBCadHDat/?utm_source=ig_web_copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch video
                        </Button>
                    </GridItem>
                </GridContainer>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection />
                    <Carousel />
                    <Button
                        color="primary"
                        size="lg"
                        href="/app"
                        rel="noopener noreferrer"
                        className={classes.appButton}
                    >
                        try chiral today!
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
