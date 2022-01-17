import React, { Fragment, useState, useContext } from "react";
import { useSelector } from "react-redux";
import Web3Context from "store/web3/Web3-context";
import Delivery from "./Delivery";
import { v4 as uuidv4 } from "uuid";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PastDelivery from "./PastDelivery";
import CustomDropdown from "UI/CustomDropdown/CustomDropdown";
import UserInfo from "./UserInfo";
import * as ga from "/lib/ga";

const useStyles = makeStyles({
    tabs: {
        width: "100%",
    },
    deliveries: {
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    filterBox: {
        display: "flex",
        alignItems: "flex-start",
        width: "95%",
    },
    "@media (max-width: 1023px)": {
        deliveries: {
            width: "100%",
        },
    },
});

const DeliveriesContainer = () => {
    const [value, setValue] = useState(0);
    const [filter, setFilter] = useState("All");
    const web3Ctx = useContext(Web3Context);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const myCurrentRequests = useSelector(
        (state) => state.request.myCurrentRequests
    );
    const myPastRequests = useSelector((state) => state.request.myPastRequests);
    let displayRequests = value === 0 ? myCurrentRequests : myPastRequests;
    if (filter === "Courier") {
        displayRequests = displayRequests.filter(
            (request) => request.courierAddress === web3Ctx.userAccount
        );
    } else if (filter === "Sender") {
        displayRequests = displayRequests.filter(
            (request) => request.pickupAddress === web3Ctx.userAccount
        );
    }

    const handleFilter = (param) => {
        ga.event({ action: `filter_${param.toLowerCase()}` });
        setFilter(param);
    };

    return (
        <Fragment>
            <div className={classes.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { background: "#FF9802" } }}
                    style={{
                        position: "relative",
                        top: "0",
                    }}
                >
                    <Tab label="Current" />
                    <Tab label="Past" />
                </Tabs>
            </div>
            <div className={classes.deliveries}>
                <UserInfo />
                <div className={classes.filterBox}>
                    <CustomDropdown
                        buttonText={filter}
                        dropdownList={["All", "Courier", "Sender"]}
                        onClick={handleFilter}
                        buttonProps={{
                            color: "info",
                        }}
                    />
                </div>
                {value === 0 &&
                    displayRequests.map((item) => (
                        <Delivery data={item} key={uuidv4()} />
                    ))}
                {value === 1 &&
                    displayRequests.map((item) => (
                        <PastDelivery
                            data={item}
                            key={uuidv4()}
                            userAddress={web3Ctx.userAccount}
                        />
                    ))}
            </div>
        </Fragment>
    );
};

export default DeliveriesContainer;
