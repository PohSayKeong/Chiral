import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import { v4 as uuidv4 } from "uuid";
import { fetchDistance } from "helpers/fetchDistance";

const RequestsContainer = () => {
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const userCoord = useSelector((state) => state.user.location);
    const viewData = useSelector((state) => state.request.viewData);
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
        if (userCoord) {
            const getDistanceToUser = async (availableRequests) => {
                availableRequests.forEach(async (request) => {
                    let temp = { ...request };
                    temp.distanceToUser = await fetchDistance(
                        request.pickup_lng,
                        request.pickup_lat,
                        userCoord.lng,
                        userCoord.lat
                    );
                    setSortedItems((prevState) => {
                        prevState.forEach((request, index) => {
                            if (request.index === temp.index) {
                                prevState[index] = temp;
                            }
                        });
                        prevState.sort((a, b) => {
                            return a.distanceToUser - b.distanceToUser;
                        });
                        return [...prevState];
                    });
                });
            };
            getDistanceToUser(availableRequests);
        }
    }, [availableRequests, userCoord, viewData]);

    const requests = (
        <Fragment>
            {sortedItems.map((item) => (
                <Request data={item} key={uuidv4()} />
            ))}
        </Fragment>
    );
    return requests;
};

export default RequestsContainer;
