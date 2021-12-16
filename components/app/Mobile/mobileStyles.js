const mobileStyles = {
    mobileBar: {
        height: `70px`,
        position: "fixed",
        bottom: "0",
        width: "100%",
        backgroundColor: "#d77d21",
    },
    mobileBarButton: {
        height: "100%",
        width: "100%",
        padding: "0",
        margin: "0",
        borderRadius: "0px",
        textTransform: "none",
        boxShadow: "none",
        "&:focus": {
            boxShadow: "none",
        },
    },
    contentBlock: {
        height: `calc(100vh - 140px)`,
        overflow: "hidden",
    },
    noBar: {
        height: `calc(100vh - 70px)`,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        height: "100%",
    },
};

export default mobileStyles;
