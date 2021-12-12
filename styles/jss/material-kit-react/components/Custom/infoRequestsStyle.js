import {
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
    title,
} from "../../../material-kit-react";

const infoRequestsStyle = {
    infoArea: {
        width: "100%",
    },
    iconWrapper: {
        float: "left",
    },
    primary: {
        color: primaryColor,
    },
    warning: {
        color: warningColor,
    },
    danger: {
        color: dangerColor,
    },
    success: {
        color: successColor,
    },
    info: {
        color: infoColor,
    },
    rose: {
        color: roseColor,
    },
    gray: {
        color: grayColor,
    },
    icon: {
        width: "36px",
        height: "36px",
    },
    descriptionWrapper: {
        marginTop: "24px",
        overflow: "hidden",
        padding: "0 2rem",
    },
    title: {
        ...title,
        fontSize: "1.5rem",
        margin: "0",
        maxWidth: "10em",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
    },
    description: {
        overflow: "hidden",
        fontSize: "1rem",
    },
    iconWrapperVertical: {
        float: "none",
    },
    iconVertical: {
        width: "61px",
        height: "61px",
    },
    header: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginLeft: "50px",
        flexDirection: "column",
    },
    badges: {
        float: "right",
    },
};

export default infoRequestsStyle;
