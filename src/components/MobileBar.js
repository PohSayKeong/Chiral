import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
// core components
import Button from "UI/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/popoverStyles.js";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import RequestForm from "components/Request/RequestForm";
import Item from "components/AvailableDeliveries/Item";
import Deliveries from "components/MyDeliveries/Deliveries";
import barStyles from "./MobileBarStyles.js";
import CreateIcon from "@material-ui/icons/Create";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PersonIcon from "@material-ui/icons/Person";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const useStyles = makeStyles({ ...styles, ...barStyles });

export default function MobileBar(props) {
    const classes = useStyles();
    const [anchorNewRequest, setNewRequest] = useState(null);
    const [anchorDeliver, setDeliver] = useState(null);
    const [anchorMyDeliveries, setMyDeliveries] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [items, setItems] = useState();
    const viewHandler = (data) => {
        if (data !== null) {
            let sortedItems = props.data;
            for (let i = 0; i < sortedItems.length; i++) {
                if (sortedItems[i].identifier === data.identifier) {
                    const temp = sortedItems[0];
                    sortedItems[0] = sortedItems[i];
                    sortedItems[i] = temp;
                }
            }
            setItems(sortedItems);
            setNewRequest(null);
            setDeliver(null);
            setClicked(data.identifier);
        }
        props.view(data);
    };
    const [clicked, setClicked] = useState("");
    const generateItemsComponent = (items) => {
        return items.map((item) => (
            <Item
                data={item}
                key={item.identifier}
                view={viewHandler}
                clicked={clicked}
            />
        ));
    };
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
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
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
                        {items
                            ? generateItemsComponent(items)
                            : generateItemsComponent(props.data)}
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
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
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
                                myData={item}
                                key={item.identifier}
                                view={viewHandler}
                            />
                        ))}
                    </div>
                </Popover>
            </GridItem>
        </GridContainer>
    );
}
