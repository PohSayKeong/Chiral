import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";

// core components
import Header from "UI/Header/Header.js";
import Footer from "UI/Footer/Footer.js";
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";
import Button from "UI/CustomButtons/Button.js";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinks.js";
import Parallax from "UI/Parallax/Parallax.js";
import styles from "styles/jss/material-kit-react/views/landingPage.js";
import Image from "next/image";

// Sections for this page
import ProductSection from "../components/landing/ProductSection";
import Carousel from "UI/Carousel/Carousel";
import Link from "next/link";
import Head from "next/head";
import * as ga from "/lib/ga";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage() {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>Chiral | P2P Courier Platform</title>
            </Head>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                icon={
                    <Image
                        src="/images/chiralIcon.png"
                        height={50}
                        width={80}
                    />
                }
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "primary",
                }}
            />
            <Parallax filter image={"images/landing-bg.webp"}>
                <GridContainer className={classes.container}>
                    <GridItem xs={12} md={8} className={classes.intro}>
                        <h1 className={classes.title}>
                            The Future of Deliveries
                        </h1>
                        <h4 className={classes.description}>
                            Full peer to peer delivery at your fingertips.
                            <br /> No more waiting around, you deliver when you
                            want and what you want.
                        </h4>
                        <br />
                    </GridItem>
                </GridContainer>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <ProductSection />
                    <Carousel />
                    <Link href="/app" style={{ textDecoration: "none" }}>
                        <Button
                            color="primary"
                            size="lg"
                            className={classes.appButton}
                            onClick={() =>
                                ga.event({
                                    action: "try_chiral",
                                })
                            }
                        >
                            try chiral today!
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
