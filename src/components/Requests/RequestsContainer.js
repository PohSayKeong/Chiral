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
    const [sortedItems, setSortedItems] = useState([...availableRequests]);
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
        const getDistanceToUser = async (availableRequests) => {
            availableRequests.forEach(async (request, index) => {
                let temp = { ...request };
                temp.distanceToUser = await fetchDistance(
                    request.pickup_lng,
                    request.pickup_lat,
                    userCoord.lng,
                    userCoord.lat
                );
                setSortedItems((prevState) => {
                    let position = 0;
                    prevState.forEach((request, index) => {
                        if (request.distanceToUser) {
                            if (
                                parseFloat(temp.distanceToUser) >
                                parseFloat(request.distanceToUser)
                            ) {
                                position += 1;
                            }
                        }
                        if (request.index === temp.index) {
                            prevState.splice(index, 1);
                            prevState.splice(position, 0, temp);
                        }
                    });
                    return [...prevState];
                });
            });
        };
        getDistanceToUser(availableRequests);
    }, [availableRequests, userCoord.lat, userCoord.lng]);

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
