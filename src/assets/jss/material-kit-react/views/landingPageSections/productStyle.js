import { title } from "assets/jss/material-kit-react.js";

const productStyle = {
    section: {
        padding: "70px 0",
        textAlign: "center",
    },
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        fontSize: "2.25rem",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'",
    },
    description: {
        color: "#999",
        fontSize: "1.5rem",
        fontWeight: "normal",
    },
};

export default productStyle;
