import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
// @material-ui/icons

// core components
import Header from "UI/Header/Header.js";
import Footer from "UI/Footer/Footer.js";
import GridContainer from "UI/Grid/GridContainer.js";
import Grow from "@material-ui/core/Grow";
import HeaderLinks from "UI/Custom/HeaderLinks/HeaderLinks.js";
import Parallax from "UI/Parallax/Parallax.js";
import styles from "../../components/about/aboutStyles";
import Image from "next/image";

// Sections for this page
import Carousel from "components/about/Carousel";

import SpeechBubble from "components/about/SpeechBubble";

const useStyles = makeStyles(styles);

export default function AboutPage() {
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
            <Head>
                <title>Chiral | P2P Courier Platform | About</title>
            </Head>
            <Header
                color="transparent"
                brand="Chiral"
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
            <Parallax
                filter
                image={"/images/landing-bg.webp"}
                className={classes.parallax}
            >
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
                        <h1 className={classes.section}>Why Chiral</h1>
                    </Grow>
                    {scrollPosition > 400 && <Carousel />}
                </div>
            </div>
            <Footer />
        </>
    );
}
