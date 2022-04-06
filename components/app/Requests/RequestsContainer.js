import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import { v4 as uuidv4 } from "uuid";
import RequestsSearchBox from "./RequestsSearchBox";
import {
    distanceToPickup,
    distanceToDestination,
    distanceToRoute,
} from "./sorting";
import { makeStyles } from "@material-ui/styles";
import Card from "UI/Card/Card";
import CustomDropdown from "UI/CustomDropdown/CustomDropdown";
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

const RequestsContainer = () => {
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const viewData = useSelector((state) => state.request.viewData);
    const filterData = useSelector((state) => state.request.filterData);
    const [sortedItems, setSortedItems] = useState([]);
    // States: All, Purchases, Orders
    const [filter, setFilter] = useState("All");
    const classes = useStyles();

    const handleFilter = (param) => {
        ga.event({ action: `filter_${param.toLowerCase()}` });
        setFilter(param);
    };

    // move selected item to the front
    if (viewData) {
        sortedItems.forEach((request, index) => {
            if (viewData.index === request.index && index !== 0) {
                setSortedItems((prevState) => {
                    return [
                        ...prevState.filter(
                            (item) => item.index === viewData.index
                        ),
                        ...prevState.filter(
                            (item) => item.index !== viewData.index
                        ),
                    ];
                });
                return;
            }
        });
    }

    useEffect(() => {
        setSortedItems(
            [...availableRequests].sort((a, b) => {
                return a.distanceToUser - b.distanceToUser;
            })
        );
        if (filterData.pickupCoord && filterData.destinationCoord) {
            distanceToRoute(availableRequests, filterData, setSortedItems);
        } else if (filterData.pickupCoord) {
            distanceToPickup(availableRequests, filterData, setSortedItems);
        } else if (filterData.destinationCoord) {
            distanceToDestination(
                availableRequests,
                filterData,
                setSortedItems
            );
        }
    }, [filterData, availableRequests, viewData]);

    let displayRequests = sortedItems;

    // Filter based on selected filter
    if (filter === "Purchases") {
        displayRequests = displayRequests.filter(
            (request) => request.value === "0"
        );
    } else if (filter === "Orders") {
        displayRequests = displayRequests.filter(
            (request) => request.value > "0"
        );
    }

    return (
        <div
            style={{
                overflow: "auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "1rem 20px",
            }}
        >
            <RequestsSearchBox />
            <div className={classes.filterBox}>
                <CustomDropdown
                    buttonText={filter}
                    dropdownList={["All", "Purchases", "Orders"]}
                    onClick={handleFilter}
                    buttonProps={{
                        color: "info",
                    }}
                />
            </div>
            {displayRequests.map((item) => (
                <Card key={uuidv4()}>
                    <Request data={item} />
                </Card>
            ))}
        </div>
    );
};

export default RequestsContainer;
