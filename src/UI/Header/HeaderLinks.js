/*eslint-disable*/
import React, { useContext } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "../CustomButtons/Button.js";
import Modal from "../Modal/Modal";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

import web3Context from "../../store/Web3-context";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
    const classes = useStyles();
    const web3Ctx = useContext(web3Context);
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Button
                    href="/"
                    color="transparent"
                    target="_blank"
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
                    target="_blank"
                    className={classes.navLink}
                >
                    {" "}
                    Whitepaper
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Modal
                    btnClass={classes.navLink}
                    tokens={web3Ctx.userTokens}
                    confirmClick={web3Ctx.handleBuyTokens}
                />
            </ListItem>
        </List>
    );
}
