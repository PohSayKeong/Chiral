/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "styles/jss/material-kit-react/components/footerStyle.js";
import * as ga from "/lib/ga";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const { whiteFont } = props;
    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    const aClasses = classNames({
        [classes.a]: true,
        [classes.footerWhiteFont]: whiteFont,
    });
    return (
        <footer className={footerClasses}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem
                            className={classes.inlineBlock}
                            onClick={() =>
                                ga.event({
                                    action: "enter_instagram",
                                })
                            }
                        >
                            <a
                                href="https://www.instagram.com/chiralcouriers/"
                                className={classes.block}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram
                            </a>
                        </ListItem>
                        <ListItem
                            className={classes.inlineBlock}
                            onClick={() =>
                                ga.event({
                                    action: "enter_discord",
                                })
                            }
                        >
                            <a
                                href="https://discord.gg/yez8zAvvC2"
                                className={classes.block}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Discord
                            </a>
                        </ListItem>
                    </List>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    whiteFont: PropTypes.bool,
};
