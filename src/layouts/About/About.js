import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "UI/Header/Header.js";
import Footer from "UI/Footer/Footer.js";
import GridContainer from "UI/Grid/GridContainer.js";
import Grow from "@material-ui/core/Grow";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinks.js";
import Parallax from "UI/Parallax/Parallax.js";
import parallaxImg from "assets/images/landing-bg.webp";
import styles from "./aboutStyles";

// Sections for this page
import Carousel from "UI/Carousel/Carousel";

import { ReactComponent as Icon } from "assets/images/chiralIcon.svg";
import SpeechBubble from "./SpeechBubble";

const useStyles = makeStyles(styles);

export default function LandingPage() {
    const classes = useStyles();
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.pageYOffset);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <>
            <Header
                color="transparent"
                brand="Chiral"
                icon={<Icon />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "primary",
                }}
            />
            <Parallax filter image={parallaxImg} className={classes.parallax}>
                <GridContainer
                    justifyContent="center"
                    className={classes.container}
                >
                    <h1 className={classes.title}>About</h1>
                </GridContainer>
            </Parallax>
            <div className={classes.mainRaised}>
                <div className={classes.beginning}>
                    <h1 className={classes.section}>How It Began</h1>
                    <SpeechBubble
                        text={"Why food delivery so expensive ah"}
                        scrollPosition={scrollPosition}
                        target={10}
                        left
                    />
                    <SpeechBubble
                        text={"Dunno leh let's look into it"}
                        scrollPosition={scrollPosition}
                        target={100}
                    />
                    <SpeechBubble
                        text={
                            "It seems like many of these riders are struggling"
                        }
                        scrollPosition={scrollPosition}
                        target={200}
                        left
                    />
                    <SpeechBubble
                        text={"You know what, they deserve better"}
                        scrollPosition={scrollPosition}
                        target={300}
                    />
                    <Grow in={scrollPosition > 400}>
                        <h1 className={classes.section}>How Chiral Works</h1>
                    </Grow>
                </div>
            </div>
            <Footer />
        </>
    );
}
