import React from "react";
import SwipeableEdgeDrawer from "UI/Custom/SwipeableEdgeDrawer/SwipeableEdgeDrawer";
import { useSelector, useDispatch } from "react-redux";
import Request from "components/app/Requests/Request";
import InfoCard from "components/app/InfoCard";
import Button from "UI/CustomButtons/Button";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import { requestActions } from "store/request-slice";

const Explore = (props) => {
    const view = useSelector((state) => state.request.viewData);
    const dispatch = useDispatch();
    const handleFormConfirm = () => {
        props.setTab("form");
    };
    const handleBack = () => {
        props.setTab("form");
        dispatch(requestActions.setViewData(null));
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
                    <GridContainer justifyContent="center">
                        <GridItem container xs={4} justifyContent="flex-end">
                            <Button
                                color="primary"
                                onClick={handleFormConfirm}
                                fullWidth
                            >
                                Enter Fees
                            </Button>
                        </GridItem>
                        <GridItem xs={4}>
                            <Button color="info" onClick={handleBack} fullWidth>
                                Back
                            </Button>
                        </GridItem>
                    </GridContainer>
                </SwipeableEdgeDrawer>
            );
        }
    }
    return display;
};

export default Explore;
