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

const RequestsContainer = () => {
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const viewData = useSelector((state) => state.request.viewData);
    const filterData = useSelector((state) => state.request.filterData);
    const [sortedItems, setSortedItems] = useState([]);

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

    return (
        <div
            style={{
                overflow: "auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <RequestsSearchBox />
            {sortedItems.map((item) => (
                <Request data={item} key={uuidv4()} />
            ))}
        </div>
    );
};

export default RequestsContainer;
