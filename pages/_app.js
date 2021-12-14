import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "mapbox-gl/dist/mapbox-gl.css";
import "styles/css/index.css";
import "styles/css/carousel.scss";
import "styles/css/autoComplete.css";
import "styles/css/chatbox.css";
import "styles/css/mapContainer.css";
import PropTypes from "prop-types";
import Head from "next/head";
import * as ga from "lib/ga";

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const router = useRouter();

    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        const handleRouteChange = (url) => {
            console.log(url)
            ga.pageview(url);
        };
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on("routeChangeComplete", handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <ClientOnly>
            <Head>
                <title>Chiral</title>
            </Head>
            <Component {...pageProps} />
        </ClientOnly>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};

function ClientOnly({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return children;
}
