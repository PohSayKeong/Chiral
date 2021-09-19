import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/infoRequestsStyle";

import Badge from "UI/Badge/Badge";
import Description from "./Description";

const useStyles = makeStyles(styles);

export default function DeliveryInfoAreaRequests(props) {
    const classes = useStyles();
    const { title, description, iconColor, vertical } = props;
    const iconWrapper = classNames({
        [classes.iconWrapper]: true,
        [classes[iconColor]]: true,
        [classes.iconWrapperVertical]: vertical,
    });
    const iconClasses = classNames({
        [classes.icon]: true,
        [classes.iconVertical]: vertical,
    });
    return (
        <div className={classes.infoArea}>
            <div className={classes.descriptionWrapper}>
                <div className={iconWrapper}>
                    <props.icon className={iconClasses} />
                </div>
                <div className={classes.header}>
                    <span className={classes.title}>{title}</span>
                    <div className={classes.badges}>
                        {props.distance ? (
                            <Badge color="info">{props.distance} Km</Badge>
                        ) : (
                            ""
                        )}
                        {props.value && (
                            <Badge color="primary">{props.value} Tokens</Badge>
                        )}
                    </div>
                </div>
                <Description className={classes.description} content={description} />
            </div>
        </div>
    );
}

DeliveryInfoAreaRequests.defaultProps = {
    iconColor: "gray",
};

DeliveryInfoAreaRequests.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconColor: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
    ]),
    vertical: PropTypes.bool,
};
