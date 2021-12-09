import React, { useContext } from "react";
import { useLocation } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Button from "../../CustomButtons/Button.js";
import styles from "../../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import Web3Context from "store/Web3-context";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function HeaderLinksApp() {
    const location = useLocation();
    const classes = useStyles();
    const web3Ctx = useContext(Web3Context);
    return (
        <List className={classes.list}>
            {location.pathname !== "/app" && (
                <ListItem className={classes.listItem}>
                    <NavLink to="/app" style={{ textDecoration: "none" }}>
                        <Button color="transparent" className={classes.navLink}>
                            App
                        </Button>
                    </NavLink>
                </ListItem>
            )}
            {location.pathname !== "/about" && (
                <ListItem className={classes.listItem}>
                    <NavLink to="/about" style={{ textDecoration: "none" }}>
                        <Button color="transparent" className={classes.navLink}>
                            About
                        </Button>
                    </NavLink>
                </ListItem>
            )}
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    className={classes.navLink}
                    href="https://docs.chiral.sg"
                    target="_blank"
                >
                    Whitepaper
                </Button>
            </ListItem>
            {location.pathname === "/app" && web3Ctx.userAccount && (
                <ListItem className={classes.listItem}>
                    <Button
                        color="transparent"
                        className={classes.navLink}
                        onClick={web3Ctx.handleBuyTokens}
                    >
                        {web3Ctx.newUser
                            ? "Claim Tokens"
                            : `${web3Ctx.userTokens} Tokens`}
                    </Button>
                </ListItem>
            )}
        </List>
    );
}
