import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import Web3Context from "store/Web3-context";
import Delivery from "./Delivery";
import { v4 as uuidv4 } from "uuid";
import { Tabs, Tab } from "@material-ui/core";
import Card from "UI/Card/Card";
import CardBody from "UI/Card/CardBody";
import { makeStyles } from "@material-ui/styles";
import PastDelivery from "./PastDelivery";
import CustomDropdown from "UI/CustomDropdown/CustomDropdown";

const useStyles = makeStyles({
    tabs: {
        width: "100%",
    },
    deliveries: {
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
        height: "calc(100% - 48px - 1rem)",
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
                <Card>
                    <CardBody>
                        <h3>{web3Ctx.userTokens} Chiral Tokens</h3>
                        <p>{web3Ctx.userAccount}</p>
                    </CardBody>
                </Card>
                <div className={classes.filterBox}>
                    <CustomDropdown
                        buttonText={filter}
                        dropdownList={["All", "Courier", "Sender"]}
                        onClick={setFilter}
                        buttonProps={{
                            color: "primary",
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
