/*eslint-disable*/
import React, { useContext } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "../../CustomButtons/Button.js";

import styles from "../../../assets/jss/material-kit-react/components/Custom/headerLinksStyle.js";

import Web3Context from "store/Web3-context";

const useStyles = makeStyles(styles);

export default function HeaderLinksLanding() {
    const classes = useStyles();
    const web3Ctx = useContext(Web3Context);
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    href="/app"
                    color="transparent"
                    className={classes.navLink}
                >
                    {" "}
                    App
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    href="/"
                    color="transparent"
                    className={classes.navLink}
                >
                    {" "}
                    About
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    href="/"
                    color="transparent"
                    className={classes.navLink}
                >
                    {" "}
                    Whitepaper
                </Button>
            </ListItem>
        </List>
    );
}
