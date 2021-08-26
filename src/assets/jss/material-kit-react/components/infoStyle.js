import {
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
    title,
} from "../../material-kit-react";

const infoStyle = {
    infoArea: {
        padding: "0 2rem",
    },
    iconWrapper: {
        float: "left",
        marginTop: "24px",
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
        color: grayColor,
        overflow: "hidden",
    },
    title: {
        ...title,
        fontSize: "1.5rem",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
    },
    description: {
        color: grayColor,
        overflow: "hidden",
        marginTop: "0px",
        fontSize: "1rem",
    },
    iconWrapperVertical: {
        float: "none",
    },
    iconVertical: {
        width: "61px",
        height: "61px",
    },
};

export default infoStyle;
