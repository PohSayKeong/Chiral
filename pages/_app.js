import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "styles/css/index.css";
import "styles/css/carousel.scss";
import "styles/css/autoComplete.css";
import "styles/css/chatbox.css";
import "styles/css/mapContainer.css";
import PropTypes from "prop-types";
import Head from "next/head";

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

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
