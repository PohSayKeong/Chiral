import React, { useContext } from "react";
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
    const classes = useStyles();
    const web3Ctx = useContext(Web3Context);
    return (
        <List className={classes.list}>
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
            {web3Ctx.userAccount && (
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
