import React, { useContext } from "react";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// core components
import Button from "../../CustomButtons/Button.js";
import styles from "../../../styles/jss/material-kit-react/components/headerLinksStyle.js";
import Web3Context from "store/Web3-context";
import Link from "next/link";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
    const location = useRouter();
    const classes = useStyles();
    const web3Ctx = useContext(Web3Context);
    return (
        <List className={classes.list}>
            {location.pathname !== "/app" && (
                <ListItem className={classes.listItem}>
                    <Link href="/app" style={{ textDecoration: "none" }}>
                        <Button color="transparent" className={classes.navLink}>
                            App
                        </Button>
                    </Link>
                </ListItem>
            )}
            {location.pathname !== "/about" &&
                location.pathname !== "/intervention" && (
                    <ListItem className={classes.listItem}>
                        <Link
                            href="/intervention"
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                color="transparent"
                                className={classes.navLink}
                            >
                                Intervention
                            </Button>
                        </Link>
                    </ListItem>
                )}
            {location.pathname !== "/about" && (
                <ListItem className={classes.listItem}>
                    <Link href="/about" style={{ textDecoration: "none" }}>
                        <Button color="transparent" className={classes.navLink}>
                            About
                        </Button>
                    </Link>
                </ListItem>
            )}
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    className={classes.navLink}
                    href="https://docs.chiral.sg"
                    target="_blank"
                    rel="noopener"
                >
                    Whitepaper
                </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
                <Button
                    color="transparent"
                    className={classes.navLink}
                    href="https://forms.gle/ghdkUkFYU9axDHRs6"
                    target="_blank"
                    rel="noopener"
                >
                    Sign Up
                </Button>
            </ListItem>
            {(location.pathname === "/app" ||
                location.pathname === "/intervention") &&
                web3Ctx.userAccount && (
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
