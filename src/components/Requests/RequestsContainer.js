import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import { v4 as uuidv4 } from "uuid";
import RequestsSearchBox from "./RequestsSearchBox";
import {
    distanceToUser,
    distanceToPickup,
    distanceToDestination,
    distanceToRoute,
} from "./sorting";

const RequestsContainer = () => {
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const userCoord = useSelector((state) => state.user.location);
    const viewData = useSelector((state) => state.request.viewData);
    const filterData = useSelector((state) => state.request.filterData);
    const [sortedItems, setSortedItems] = useState([]);

    // move selected item to the front
    if (sortedItems.length > 0 && viewData) {
        if (viewData.index) {
            if (viewData.index !== sortedItems[0].index) {
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
            }
        }
    }

    useEffect(() => {
        setSortedItems([...availableRequests]);
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
        } else if (userCoord) {
            distanceToUser(availableRequests, userCoord, setSortedItems);
        }
    }, [filterData, availableRequests, userCoord, viewData]);

    return (
        <Fragment>
            <RequestsSearchBox />
            {sortedItems.map((item) => (
                <Request data={item} key={uuidv4()} />
            ))}
        </Fragment>
    );
};

export default RequestsContainer;
