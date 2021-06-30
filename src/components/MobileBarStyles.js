const barStyle = {
    MobileBarButton: {
        backgroundColor: "#9c27b0",
        height: "100%",
        width: "100%",
        padding: "0",
        margin: "0",
        borderRadius: "0px",
        textTransform: "none",
        "&:hover,&:active": {
            backgroundColor: "#ff9800",
        },
        "&:focus": {
            backgroundColor: "#9c27b0",
        },
    },
    popover: {
        width: "calc(100% + 16px)",
        maxWidth: "none",
        left: [["-16px"], "!important"],
    },
};

export default barStyle;
