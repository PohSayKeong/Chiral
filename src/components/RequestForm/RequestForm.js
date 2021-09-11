import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// core components
import GridContainer from "../../UI/Grid/GridContainer.js";
import GridItem from "../../UI/Grid/GridItem.js";
import Card from "../../UI/Card/Card";
import Web3Context from "store/Web3-context";
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

export default function RequestForm() {
    const formData = useSelector((state) => state.ui.form);
    const formQuery = useSelector((state) => state.ui.query);
    const viewData = useSelector((state) => state.request.viewData);
    const [clicked, setClicked] = useState(false);
    const nameProps = useInput(
        (value) => value.trim() !== "",
        formData ? formData.name : ""
    );
    const pickupProps = useInput(
        (value) => value.trim() !== "",
        formData ? formData.pickup : ""
    );
    const destinationProps = useInput(
        (value) => value.trim() !== "",
        formData ? formData.destination : ""
    );
    const valueProps = useInput(
        (value) => value.trim() !== "" && !isNaN(value),
        formData ? formData.value : ""
    );
    const feesProps = useInput(
        (value) => value.trim() !== "" && !isNaN(value),
        formData ? formData.fees : ""
    );
    const pickupFloorProps = useInput(
        () => {},
        formData ? formData.pickupFloor : ""
    );
    const pickupUnitProps = useInput(
        () => {},
        formData ? formData.pickupUnit : ""
    );
    const destinationFloorProps = useInput(
        () => {},
        formData ? formData.destinationFloor : ""
    );
    const destinationUnitProps = useInput(
        () => {},
        formData ? formData.destinationUnit : ""
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
        valueProps.isValid &&
        feesProps.isValid &&
        selectedWeight !== ""
    ) {
        formIsValid = true;
    }

    const data = {
        name: nameProps.value,
        pickup: pickupProps.value,
        destination: destinationProps.value,
        value: valueProps.value,
        fees: feesProps.value,
        pickupFloor: pickupFloorProps.value,
        pickupUnit: pickupUnitProps.value,
        destinationFloor: destinationFloorProps.value,
        destinationUnit: destinationUnitProps.value,
        estimatedFees: estimatedFees,
        weight: selectedWeight,
    };
    const dataRef = useRef(data);
    if (
        formQuery &&
        viewData === formQuery &&
        data.pickup === formData.pickup &&
        data.destination === formData.destination &&
        clicked === false
    ) {
        setClicked(true);
    }

    const handleSubmit = async () => {
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
        dispatch(requestActions.setViewData(query));
        dispatch(uiActions.saveForm({ data, query }));
        if (clicked) {
            const processCoord = (coord) =>
                Math.trunc(coord * Math.pow(10, 15)).toString();
            let output = {
                name: nameProps.value,
                pickup: [
                    processCoord(query.pickup_lat),
                    processCoord(query.pickup_lng),
                    pickupFloorProps.value ? pickupFloorProps.value : 0,
                    pickupUnitProps.value ? pickupUnitProps.value : 0,
                ],
                destination: [
                    processCoord(query.destination_lat),
                    processCoord(query.destination_lng),
                    destinationFloorProps.value
                        ? destinationFloorProps.value
                        : 0,
                    destinationUnitProps.value ? destinationUnitProps.value : 0,
                ],
                value: valueProps.value,
                fees: feesProps.value,
                weight: selectedWeight,
            };
            web3Ctx.handleSubmitRequest(output);
            clearForm();
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
        <Card>
            <form>
                <GridContainer alignItems="center" direction="column">
                    <GridItem xs={10} md={8}>
                        <Name {...nameProps} />
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <Location
                            {...pickupProps}
                            resetClicked={setClicked}
                            type={"Pickup"}
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
                    <GridItem xs={10} md={8}>
                        <Value {...valueProps} />
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <Fees {...feesProps} estimatedFees={estimatedFees} />
                    </GridItem>
                    <GridItem xs={10} md={8} style={{ textAlign: "center" }}>
                        <Submit
                            handleSubmit={handleSubmit}
                            formIsValid={formIsValid}
                            clicked={clicked}
                        />
                    </GridItem>
                </GridContainer>
            </form>
        </Card>
    );
}
