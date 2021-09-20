const mobileStyles = {
    mobileBar: {
        height: `calc(0.1 * (100vh - 70px))`,
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "#9c27b0",
    },
    mobileBarButton: {
        height: "100%",
        width: "100%",
        padding: "0",
        margin: "0",
        borderRadius: "0px",
        textTransform: "none",
    },
    contentBlock: {
        height: `calc(0.9 * (100vh - 70px))`,
        overflow: "hidden",
        width: "100%",
    },
    content: {
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        height: "100%",
    },
};

export default mobileStyles;
