import React from "react";
import SwipeableEdgeDrawer from "UI/Custom/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import { useSelector } from "react-redux";
import Request from "components/Requests/Request";
import InfoCard from "components/InfoCard";
import Button from "UI/CustomButtons/Button";

const Explore = (props) => {
    const view = useSelector((state) => state.request.viewData);
    const handleFormConfirm = () => {
        props.setTab("form");
    };
    let display = null;
    if (view) {
        if (view.step && view.step === "0") {
            // view is available
            display = (
                <SwipeableEdgeDrawer>
                    <Request data={view} />
                </SwipeableEdgeDrawer>
            );
        } else if (!view.index) {
            // view is a new request
            display = (
                <SwipeableEdgeDrawer>
                    <InfoCard data={view} details />
                    <Button color="primary" onClick={handleFormConfirm}>
                        Looks Good!
                    </Button>
                </SwipeableEdgeDrawer>
            );
        }
    }
    return display;
};

export default Explore;
