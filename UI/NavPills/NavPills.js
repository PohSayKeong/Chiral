import React, { useRef, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";

import styles from "../../styles/jss/material-kit-react/components/navPillsStyle.js";

const useStyles = makeStyles(styles);

export default function NavPills(props) {
    const [active, setActive] = React.useState(props.active);
    const [offset, setOffset] = useState("");
    const handleChange = (event, active) => {
        setActive(active);
    };
    const classes = useStyles();
    const { tabs, color, horizontal, alignCenter } = props;
    const flexContainerClasses = classNames({
        [classes.flexContainer]: true,
        [classes.horizontalDisplay]: horizontal !== undefined,
    });
    const tabContentRef = useRef();
    const tabContentWrapperRef = useRef();
    if (tabContentRef.current && offset === "") {
        setOffset(
            tabContentWrapperRef.current.clientWidth -
                tabContentRef.current.offsetWidth +
                "px"
        );
    }
    const tabButtons = (
        <Tabs
            classes={{
                root: classes.root,
                fixed: classes.fixed,
                flexContainer: flexContainerClasses,
                indicator: classes.displayNone,
            }}
            value={active}
            onChange={handleChange}
            centered={alignCenter}
        >
            {tabs.map((prop, key) => {
                var icon = {};
                if (prop.tabIcon !== undefined) {
                    icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
                }
                const pillsClasses = classNames({
                    [classes.pills]: true,
                    [classes.horizontalPills]: horizontal !== undefined,
                    [classes.pillsWithIcons]: prop.tabIcon !== undefined,
                });
                return (
                    <Tab
                        label={prop.tabButton}
                        key={key}
                        {...icon}
                        classes={{
                            root: pillsClasses,
                            selected: classes[color],
                            wrapper: classes.tabWrapper,
                        }}
                    />
                );
            })}
        </Tabs>
    );
    const tabContent = (
        <div className={classes.contentWrapper}>
            {tabs.map((prop, key) => {
                if (key === active) {
                    return (
                        <div
                            className={classes.tabContent}
                            key={key}
                            ref={tabContentRef}
                        >
                            {prop.tabContent}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
    return horizontal !== undefined ? (
        <GridContainer spacing={3}>
            <GridItem xs={3} {...horizontal.tabsGrid}>
                {tabButtons}
            </GridItem>
            <GridItem
                xs={9}
                {...horizontal.contentGrid}
                forward={tabContentWrapperRef}
            >
                {tabContent}
            </GridItem>
        </GridContainer>
    ) : (
        <div>
            {tabButtons}
            {tabContent}
        </div>
    );
}

NavPills.defaultProps = {
    active: 0,
    color: "primary",
};

NavPills.propTypes = {
    // index of the default active pill
    active: PropTypes.number,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabButton: PropTypes.string,
            tabIcon: PropTypes.object,
            tabContent: PropTypes.node,
        })
    ).isRequired,
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
    ]),
    horizontal: PropTypes.shape({
        tabsGrid: PropTypes.object,
        contentGrid: PropTypes.object,
    }),
    alignCenter: PropTypes.bool,
};
