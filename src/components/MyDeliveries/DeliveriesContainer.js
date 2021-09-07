import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Delivery from "./Delivery";
import { v4 as uuidv4 } from "uuid";

const DeliveriesContainer = () => {
    const myCurrentRequests = useSelector(
        (state) => state.request.myCurrentRequests
    );

    const deliveries = (
        <Fragment>
            {myCurrentRequests.map((item) => (
                <Delivery data={item} key={uuidv4()} />
            ))}
        </Fragment>
    );
    return deliveries;
};

export default DeliveriesContainer;
