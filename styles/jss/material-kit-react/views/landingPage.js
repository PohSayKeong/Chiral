import { container, title } from "styles/jss/material-kit-react.js";

const landingPageStyle = {
    container: {
        ...container,
        zIndex: "12",
        color: "#FFFFFF",
        flexDirection: "row-reverse",
        textAlign: "center",
        width: "auto",
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none",
        fontSize: "4rem",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0",
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    description: {
        fontWeight: "normal",
    },
    appButton: {
        marginBottom: "70px",
    },
    intro: {
        textAlign: "end",
    },
};

export default landingPageStyle;
