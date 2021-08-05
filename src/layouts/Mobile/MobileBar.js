import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
// core components
import Button from "UI/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/popoverStyles.js";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import RequestForm from "components/RequestForm/RequestForm";
import Request from "components/Requests/Request";
import Deliveries from "components/MyDeliveries/Deliveries";
import barStyles from "./MobileBarStyles.js";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PersonIcon from "@material-ui/icons/Person";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({ ...styles, ...barStyles });

export default function MobileBar(props) {
    const classes = useStyles();
    const [anchorNewRequest, setNewRequest] = useState(null);
    const [anchorDeliver, setDeliver] = useState(null);
    const [anchorMyDeliveries, setMyDeliveries] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [clicked, setClicked] = useState("");

    const viewHandler = (data) => {
        setNewRequest(null);
        setDeliver(null);
        setMyDeliveries(null);
        setClicked(data);
        props.view(data);
    };

    // selected request by clicking on map
    if (props.viewData && props.viewData !== clicked) {
        viewHandler(props.viewData);
    }

    let sortedRequests = props.data;
    // move selected item to the front
    if (props.data.includes(props.viewData)) {
        sortedRequests = [
            props.viewData,
            ...props.data.filter((item) => item !== props.viewData),
        ];
    }

    return (
        <GridContainer className="Grid">
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setNewRequest(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <CreateIcon />
                        <br />
                        New Request
                    </p>
                </Button>
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={Boolean(anchorNewRequest)}
                    onClose={() => {
                        setNewRequest(null);
                    }}
                    onOpen={() => {}}
                >
                    {
                        <RequestForm
                            view={viewHandler}
                            save={setFormValues}
                            values={formValues}
                        />
                    }
                </SwipeableDrawer>
            </GridItem>
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setDeliver(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <LocalShippingIcon />
                        <br />
                        Deliver
                    </p>
                </Button>
                <Popover
                    classes={{
                        paper: classes.popover,
                    }}
                    open={Boolean(anchorDeliver)}
                    anchorEl={anchorDeliver}
                    onClose={() => setDeliver(null)}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            overflow: "auto",
                            height: "40vh",
                        }}
                    >
                        {sortedRequests.map((item) => (
                            <Request
                                data={item}
                                key={uuidv4()}
                                view={viewHandler}
                                clicked={clicked}
                            />
                        ))}
                    </div>
                </Popover>
            </GridItem>
            <GridItem xs={4}>
                <Button
                    onClick={(event) => setMyDeliveries(event.currentTarget)}
                    classes={{ root: classes.MobileBarButton }}
                >
                    <p>
                        <PersonIcon />
                        <br />
                        My Deliveries
                    </p>
                </Button>
                <Popover
                    classes={{
                        paper: classes.popover,
                    }}
                    open={Boolean(anchorMyDeliveries)}
                    anchorEl={anchorMyDeliveries}
                    onClose={() => setMyDeliveries(null)}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <div
                        style={{
                            overflow: "auto",
                            height: "20vh",
                        }}
                    >
                        {props.myData.map((item) => (
                            <Deliveries
                                data={item}
                                key={uuidv4()}
                                view={viewHandler}
                            />
                        ))}
                    </div>
                </Popover>
            </GridItem>
        </GridContainer>
    );
}
