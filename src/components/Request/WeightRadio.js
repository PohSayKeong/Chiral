import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import styles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";

import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const useStyles = makeStyles(styles);

export default function CheckboxRadioSwitch(props) {
    const { selectedEnabled, setSelectedEnabled } = props;
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12}>
                <p style={{ color: "#AAAAAA" }}>Weight Class</p>
            </GridItem>
            <GridItem xs={4} container={true}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={selectedEnabled === "0"}
                            onChange={() => setSelectedEnabled("0")}
                            value="foot"
                            name="foot"
                            aria-label="Foot"
                            icon={
                                <FiberManualRecord
                                    className={classes.radioUnchecked}
                                />
                            }
                            checkedIcon={
                                <FiberManualRecord
                                    className={classes.radioChecked}
                                />
                            }
                            classes={{
                                checked: classes.radio,
                            }}
                        />
                    }
                    style={{ marginRight: "0px" }}
                />
                <DirectionsWalkIcon
                    fontSize="large"
                    style={{ color: "9C27B0" }}
                    onClick={() => setSelectedEnabled("0")}
                />
            </GridItem>
            <GridItem xs={4} container={true}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={selectedEnabled === "1"}
                            onChange={() => setSelectedEnabled("1")}
                            value="bike"
                            name="bike"
                            aria-label="Bike"
                            icon={
                                <FiberManualRecord
                                    className={classes.radioUnchecked}
                                />
                            }
                            checkedIcon={
                                <FiberManualRecord
                                    className={classes.radioChecked}
                                />
                            }
                            classes={{
                                checked: classes.radio,
                            }}
                        />
                    }
                    style={{ marginRight: "0px" }}
                />
                <MotorcycleIcon
                    fontSize="large"
                    style={{ color: "9C27B0" }}
                    onClick={() => setSelectedEnabled("1")}
                />
            </GridItem>
            <GridItem xs={4} container={true}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={selectedEnabled === "2"}
                            onChange={() => setSelectedEnabled("2")}
                            value="car"
                            name="car"
                            aria-label="Car"
                            icon={
                                <FiberManualRecord
                                    className={classes.radioUnchecked}
                                />
                            }
                            checkedIcon={
                                <FiberManualRecord
                                    className={classes.radioChecked}
                                />
                            }
                            classes={{
                                checked: classes.radio,
                            }}
                        />
                    }
                    style={{ marginRight: "0px" }}
                />
                <LocalShippingIcon
                    fontSize="large"
                    style={{ color: "9C27B0" }}
                    onClick={() => setSelectedEnabled("2")}
                />
            </GridItem>
        </GridContainer>
    );
}
