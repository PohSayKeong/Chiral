import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Request from "./Request";
import { v4 as uuidv4 } from "uuid";

const RequestsContainer = () => {
    const availableRequests = useSelector(
        (state) => state.request.availableRequests
    );
    const viewData = useSelector((state) => state.request.viewData);
    let sortedItems = availableRequests;
    // move selected item to the front
    if (availableRequests.includes(viewData)) {
        sortedItems = [
            viewData,
            ...availableRequests.filter((item) => item !== viewData),
        ];
    }
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
