/*eslint-disable*/
import React, { useContext } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "../../CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function HeaderLinksLanding() {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <NavLink to="/app" style={{ textDecoration: "none" }}>
                    <Button color="transparent" className={classes.navLink}>
                        App
                    </Button>
                </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <Button color="transparent" className={classes.navLink}>
                        About
                    </Button>
                </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
                <NavLink to="/" style={{ textDecoration: "none" }}>
                    <Button color="transparent" className={classes.navLink}>
                        Whitepaper
                    </Button>
                </NavLink>
            </ListItem>
        </List>
    );
}
