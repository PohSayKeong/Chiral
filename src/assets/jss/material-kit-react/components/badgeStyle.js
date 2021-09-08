import {
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
} from "../../material-kit-react";

const badgeStyle = {
    badge: {
        marginRight: "3px",
        borderRadius: "12px",
        padding: "5px 12px",
        textTransform: "uppercase",
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "1",
        color: "#fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        display: "inline-block",
        right: "1rem",
    },
    primary: {
        backgroundColor: primaryColor,
    },
    warning: {
        backgroundColor: warningColor,
    },
    danger: {
        backgroundColor: dangerColor,
    },
    success: {
        backgroundColor: successColor,
    },
    info: {
        backgroundColor: infoColor,
    },
    rose: {
        backgroundColor: roseColor,
    },
    gray: {
        backgroundColor: "#6c757d",
    },
};

export default badgeStyle;
