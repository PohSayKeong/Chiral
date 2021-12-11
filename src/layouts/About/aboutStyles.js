const aboutStyles = {
    container: {
        zIndex: 1,
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        position: "relative",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "120vh",
        padding: "1rem",
    },
    title: {
        marginTop: "30px",
        color: "#FFFFFF",
        fontSize: "4rem",
        textAlign: "center",
    },
    section: {
        fontSize: "2rem",
        textAlign: "center",
    },
    parallax: {
        height: "40vh",
        justifyContent: "center",
    },
    speechBubble: {
        position: "relative",
        background: "#00aabb",
        borderRadius: ".4em",
        width: "fit-content",
        color: "white",
        padding: "10px",
        maxWidth: "50%",
        "&:after": {
            content: "''",
            position: "absolute",
            bottom: "0",
            left: "50%",
            width: "0",
            height: "0",
            border: "31px solid transparent",
            borderTopColor: "#00aabb",
            borderBottom: "0",
            marginLeft: "-15.5px",
            marginBottom: "-31px",
        },
    },
    left: {
        "&:after": { borderLeft: 0 },
    },
    right: {
        "&:after": { borderRight: 0 },
    },
    speechContainerRight: {
        display: "flex",
        justifyContent: "flex-end",
    },
    beginning: {
        width: "100%",
        maxWidth: "800px",
    },
};

export default aboutStyles;
