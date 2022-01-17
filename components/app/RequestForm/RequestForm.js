import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// core components
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";
import Web3Context from "store/web3/Web3-context";
import useInput from "hooks/use-input.js";
import WeightRadio from "./Components/WeightRadio";
import fetchLatLng from "helpers/fetchLatLng.js";
import { fetchRequestDistance } from "helpers/fetchDistance.js";
import calculateFees from "helpers/calculateFees.js";
import Name from "./Components/Name.js";
import Location from "./Components/Location.js";
import Value from "./Components/Value.js";
import Fees from "./Components/Fees.js";
import { requestActions } from "store/request-slice";
import Submit from "./Components/Submit.js";
import { uiActions } from "store/ui-slice.js";
import UnitDetails from "./Components/UnitDetails.js";
import { Tabs, Tab } from "@material-ui/core";
import * as ga from "/lib/ga";

const notEmpty = (value) => {
    return value.trim() !== "";
};

const isInt = (value) => {
    return Number.isInteger(parseFloat(value));
};

const validateUnitDetails = (value) => {
    if (value !== "") {
        return isInt(value);
    } else {
        return true;
    }
};

export default function RequestForm() {
    const formData = useSelector((state) => state.ui.form);
    const formQuery = useSelector((state) => state.ui.query);
    const viewData = useSelector((state) => state.request.viewData);
    const [clicked, setClicked] = useState(false);
    const [sendingItem, setSendingItem] = useState(
        formData ? formData.sendingItem : 0
    );
    const nameProps = useInput(notEmpty, formData ? formData.identifier : "");
    const pickupProps = useInput(notEmpty, formData ? formData.pickup : "");
    const destinationProps = useInput(
        notEmpty,
        formData ? formData.destination : ""
    );
    const valueProps = useInput(
        (value) => notEmpty(value) && isInt(value),
        formData ? formData.value : ""
    );
    const feesProps = useInput(
        (value) => notEmpty(value) && isInt(value),
        formData ? formData.fees : ""
    );
    const pickupFloorProps = useInput(
        validateUnitDetails,
        formData ? formData.pickup_floor : ""
    );
    const pickupUnitProps = useInput(
        validateUnitDetails,
        formData ? formData.pickup_unit : ""
    );
    const destinationFloorProps = useInput(
        validateUnitDetails,
        formData ? formData.destination_floor : ""
    );
    const destinationUnitProps = useInput(
        validateUnitDetails,
        formData ? formData.destination_unit : ""
    );
    const [selectedWeight, setSelectedWeight] = useState(
        formData && formData.weight ? formData.weight : ""
    );

    const [estimatedFees, setEstimatedFees] = useState(
        formData && formData.estimatedFees ? formData.estimatedFees : 0
    );
    const web3Ctx = useContext(Web3Context);
    const dispatch = useDispatch();

    let formIsValid = false;
    if (
        nameProps.isValid &&
        pickupProps.isValid &&
        destinationProps.isValid &&
        pickupFloorProps.isValid &&
        pickupUnitProps.isValid &&
        destinationFloorProps.isValid &&
        destinationUnitProps.isValid &&
        selectedWeight !== "" &&
        (sendingItem === 1 ? valueProps.isValid : true) &&
        (clicked
            ? feesProps.isValid && web3Ctx.userTokens >= feesProps.value
            : true)
    ) {
        formIsValid = true;
    }

    const data = useMemo(
        () => ({
            identifier: nameProps.value,
            pickup: pickupProps.value,
            destination: destinationProps.value,
            value: valueProps.value,
            fees: feesProps.value,
            pickup_floor: pickupFloorProps.value,
            pickup_unit: pickupUnitProps.value,
            destination_floor: destinationFloorProps.value,
            destination_unit: destinationUnitProps.value,
            estimatedFees: estimatedFees,
            weight: selectedWeight,
            sendingItem: sendingItem,
        }),
        [
            nameProps,
            pickupProps,
            destinationProps,
            valueProps,
            feesProps,
            pickupFloorProps,
            pickupUnitProps,
            destinationFloorProps,
            destinationUnitProps,
            estimatedFees,
            selectedWeight,
            sendingItem,
        ]
    );
    const dataRef = useRef(data);
    if (
        formQuery &&
        viewData &&
        viewData.query === formQuery &&
        data.pickup === formData.pickup &&
        data.destination === formData.destination &&
        clicked === false
    ) {
        setClicked(true);
    }

    const handleSubmit = async () => {
        if (clicked) {
            const processCoord = (coord) =>
                Math.trunc(coord * Math.pow(10, 15)).toString();
            let output = {
                name: nameProps.value,
                pickup: [
                    processCoord(formQuery.pickup_lat),
                    processCoord(formQuery.pickup_lng),
                    pickupFloorProps.value ? pickupFloorProps.value : 0,
                    pickupUnitProps.value ? pickupUnitProps.value : 0,
                ],
                destination: [
                    processCoord(formQuery.destination_lat),
                    processCoord(formQuery.destination_lng),
                    destinationFloorProps.value
                        ? destinationFloorProps.value
                        : 0,
                    destinationUnitProps.value ? destinationUnitProps.value : 0,
                ],
                value: sendingItem === 1 ? valueProps.value : 0,
                fees: feesProps.value,
                weight: selectedWeight,
            };
            web3Ctx.handleSubmitRequest(output);
            clearForm();
        } else {
            ga.event({ action: "show_new_request" });
            const pickupData = await fetchLatLng(pickupProps.value);
            const destinationData = await fetchLatLng(destinationProps.value);
            let query = {
                pickup_lat: pickupData.features[0].center[1],
                pickup_lng: pickupData.features[0].center[0],
                destination_lat: destinationData.features[0].center[1],
                destination_lng: destinationData.features[0].center[0],
            };
            const distance = await fetchRequestDistance(query);
            setEstimatedFees(calculateFees(distance));
            dispatch(uiActions.saveForm({ data, query }));
            dispatch(
                requestActions.setViewData({
                    ...dataRef.current,
                    requestDistance: distance,
                    ...query,
                    query,
                })
            );
        }
    };

    const clearForm = () => {
        nameProps.reset();
        pickupProps.reset();
        destinationProps.reset();
        valueProps.reset();
        feesProps.reset();
        pickupFloorProps.reset();
        pickupUnitProps.reset();
        destinationUnitProps.reset();
        destinationFloorProps.reset();
        setSelectedWeight("");
        setClicked(false);
        setEstimatedFees(0);
        setSendingItem(0);
        dispatch(uiActions.resetForm());
        dispatch(requestActions.setViewData(null));
    };

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    useEffect(() => {
        return () => {
            dispatch(uiActions.saveForm(dataRef.current));
        };
    }, [dispatch]);

    return (
        <div style={{ width: "100%" }}>
            <Tabs
                value={sendingItem}
                onChange={(event, newValue) => setSendingItem(newValue)}
                variant="fullWidth"
                TabIndicatorProps={{ style: { background: "#FF9802" } }}
                style={{
                    position: "relative",
                    top: "0",
                }}
            >
                <Tab label="Purchase" />
                <Tab label="Send" />
            </Tabs>
            <form style={{ width: "100%" }}>
                <GridContainer alignItems="center" direction="column">
                    <GridItem xs={10} md={8} style={{ marginTop: "2rem" }}>
                        <b>
                            {sendingItem
                                ? "The courier will collect a package from you and send it to the designated location"
                                : "The courier will purchase the item(s) on your behalf and deliver to the designated location"}
                        </b>
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <Name {...nameProps} />
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <Location
                            {...pickupProps}
                            resetClicked={setClicked}
                            pickup={true}
                            sendingItem={sendingItem}
                        />
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <GridContainer>
                            <GridItem xs={5}>
                                <UnitDetails
                                    type={"Floor"}
                                    {...pickupFloorProps}
                                />
                            </GridItem>
                            <GridItem xs={2} />
                            <GridItem xs={5}>
                                <UnitDetails
                                    type={"Unit"}
                                    {...pickupUnitProps}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <Location
                            {...destinationProps}
                            resetClicked={setClicked}
                            type={"Destination"}
                        />
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <GridContainer>
                            <GridItem xs={5}>
                                <UnitDetails
                                    type={"Floor"}
                                    {...destinationFloorProps}
                                />
                            </GridItem>
                            <GridItem xs={2} />
                            <GridItem xs={5}>
                                <UnitDetails
                                    type={"Unit"}
                                    {...destinationUnitProps}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <WeightRadio
                            selectedEnabled={selectedWeight}
                            setSelectedEnabled={setSelectedWeight}
                        />
                    </GridItem>
                    {sendingItem === 1 && (
                        <GridItem xs={10} md={8}>
                            <Value
                                {...valueProps}
                                sendingItem={sendingItem}
                                setSendingItem={setSendingItem}
                            />
                        </GridItem>
                    )}
                    {clicked && (
                        <GridItem xs={10} md={8}>
                            <Fees
                                {...feesProps}
                                estimatedFees={estimatedFees}
                            />
                        </GridItem>
                    )}
                    <GridItem xs={10} md={8} style={{ textAlign: "center" }}>
                        <Submit
                            handleSubmit={handleSubmit}
                            formIsValid={formIsValid}
                            clicked={clicked}
                            enoughTokens={web3Ctx.userTokens >= feesProps.value}
                        />
                    </GridItem>
                </GridContainer>
            </form>
        </div>
    );
}
