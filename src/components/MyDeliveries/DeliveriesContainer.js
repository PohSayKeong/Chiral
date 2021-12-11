import React, { Fragment, useState, useContext } from "react";
import { useSelector } from "react-redux";
import Web3Context from "store/Web3-context";
import Delivery from "./Delivery";
import ReportedDelivery from "./ReportedDelivery";
import { v4 as uuidv4 } from "uuid";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PastDelivery from "./PastDelivery";
import CustomDropdown from "UI/CustomDropdown/CustomDropdown";
import UserInfo from "./UserInfo";

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
    // States: 0(current), 1(past)
    const [value, setValue] = useState(0);
    // States: All, Courier, Sender, Reported
    const [filter, setFilter] = useState("All");

    const web3Ctx = useContext(Web3Context);
    const classes = useStyles();

    // Handle change of current/past tabs
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Retrieve current, past and reported deliveries from store
    const myCurrentRequests = useSelector(
        (state) => state.request.myCurrentRequests
    );
    const myPastRequests = useSelector((state) => state.request.myPastRequests);
    const myReportedRequests = useSelector(
        (state) => state.request.myReportedRequests
    );

    // Choose to display current or past requests and convert to mutable variables
    let displayRequests = value === 0 ? myCurrentRequests : myPastRequests;
    let reportedRequests = myReportedRequests;

    // Filter based on selected filter
    if (filter === "Courier") {
        displayRequests = displayRequests.filter(
            (request) => request.courierAddress === web3Ctx.userAccount
        );
        reportedRequests = reportedRequests.filter(
            (request) => request.courierAddress === web3Ctx.userAccount
        );
    } else if (filter === "Sender") {
        displayRequests = displayRequests.filter(
            (request) => request.pickupAddress === web3Ctx.userAccount
        );
        reportedRequests = reportedRequests.filter(
            (request) => request.pickupAddress === web3Ctx.userAccount
        );
    }
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
                        onClick={setFilter}
                        buttonProps={{
                            color: "info",
                        }}
                    />
                </div>
                {value === 0 &&
                    displayRequests.map((item) => (
                        <Delivery data={item} key={uuidv4()} />
                    ))}
                {value === 0 &&
                    reportedRequests.map((item) => (
                        <ReportedDelivery data={item} key={uuidv4()} />
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
