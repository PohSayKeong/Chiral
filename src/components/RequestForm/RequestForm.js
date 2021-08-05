import React, { useContext, useEffect, useRef, useState } from "react";
// core components
import GridContainer from "../../UI/Grid/GridContainer.js";
import GridItem from "../../UI/Grid/GridItem.js";
import CustomInput from "../../UI/CustomInput/CustomInput";
import Button from "../../UI/CustomButtons/Button";
import Card from "../../UI/Card/Card";
import AutoComplete from "./AutoComplete";
import Web3Context from "store/Web3-context";
import useInput from "hooks/use-input.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import WeightRadio from "./WeightRadio";
import fetchLatLng from "helpers/fetchLatLng.js";
import fetchDistance from "helpers/fetchDistance.js";
import calculateFees from "helpers/calculateFees.js";

export default function RequestForm(props) {
    const { view, save, values } = props;
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== "", values ? values.name : "");
    const nameRef = useRef();
    nameRef.current = enteredName;
    const {
        value: enteredPickup,
        isValid: enteredPickupIsValid,
        hasError: pickupInputHasError,
        valueChangeHandler: pickupChangeHandler,
        inputBlurHandler: pickupBlurHandler,
        reset: resetPickupInput,
    } = useInput((value) => value.trim() !== "", values ? values.pickup : "");
    const pickupRef = useRef();
    pickupRef.current = enteredPickup;
    const {
        value: enteredDestination,
        isValid: enteredDestinationIsValid,
        hasError: destinationInputHasError,
        valueChangeHandler: destinationChangeHandler,
        inputBlurHandler: destinationBlurHandler,
        reset: resetDestinationInput,
    } = useInput(
        (value) => value.trim() !== "",
        values ? values.destination : ""
    );
    const destinationRef = useRef();
    destinationRef.current = enteredDestination;
    const {
        value: enteredValue,
        isValid: enteredValueIsValid,
        hasError: valueInputHasError,
        valueChangeHandler,
        inputBlurHandler: valueBlurHandler,
        reset: resetValueInput,
    } = useInput(
        (value) => value.trim() !== "" && !isNaN(value),
        values ? values.value : ""
    );
    const valueRef = useRef();
    valueRef.current = enteredValue;
    const {
        value: enteredFees,
        isValid: enteredFeesIsValid,
        hasError: feesInputHasError,
        valueChangeHandler: feesChangeHandler,
        inputBlurHandler: feesBlurHandler,
        reset: resetFeesInput,
    } = useInput(
        (value) => value.trim() !== "" && !isNaN(value),
        values ? values.fees : ""
    );
    const feesRef = useRef();
    feesRef.current = enteredFees;
    const pickupFloor = useRef();
    const pickupUnit = useRef();
    const destinationFloor = useRef();
    const destinationUnit = useRef();
    const [selectedWeight, setSelectedWeight] = useState(
        values && values.weight ? values.weight : ""
    );
    const selectedWeightRef = useRef();
    selectedWeightRef.current = selectedWeight;

    const [buttonProps, setButtonProps] = useState({
        text: "Show on map",
        color: "primary",
        clicked: false,
    });
    const clickedRef = useRef();
    clickedRef.current = buttonProps.clicked;
    const [estimatedFees, setEstimatedFees] = useState(0);
    const web3Ctx = useContext(Web3Context);

    let formIsValid = false;

    if (
        enteredNameIsValid &&
        enteredPickupIsValid &&
        enteredDestinationIsValid &&
        enteredValueIsValid &&
        enteredFeesIsValid &&
        selectedWeight !== ""
    ) {
        formIsValid = true;
    }

    useEffect(() => {
        if (values) {
            if (values.requestSubmit) {
                setButtonProps((prevButtonProps) => {
                    return {
                        ...prevButtonProps,
                        text: "Confirm",
                        color: "warning",
                        clicked: true,
                    };
                });
            }
        }
    }, [values]);

    const resetClicked = () => {
        setButtonProps({
            ...buttonProps,
            text: "Show on map",
            color: "primary",
            clicked: false,
        });
        setEstimatedFees(0);
    };

    const handleSubmit = async () => {
        const pickupData = await fetchLatLng(enteredPickup);
        const destinationData = await fetchLatLng(enteredDestination);
        let query = {
            pickup_lat: pickupData.features[0].center[1],
            pickup_lng: pickupData.features[0].center[0],
            destination_lat: destinationData.features[0].center[1],
            destination_lng: destinationData.features[0].center[0],
        };
        const distance = await fetchDistance(query);
        setEstimatedFees(calculateFees(distance));
        if (buttonProps.clicked === false) {
            setButtonProps({
                ...buttonProps,
                text: "Confirm",
                color: "warning",
                clicked: true,
            });
            view(query);
        } else {
            const processCoord = (coord) =>
                Math.trunc(coord * Math.pow(10, 15)).toString();
            let output = {
                name: enteredName,
                pickup: [
                    processCoord(query.pickup_lat),
                    processCoord(query.pickup_lng),
                    pickupFloor.current.value ? pickupFloor.current.value : 0,
                    pickupUnit.current.value ? pickupUnit.current.value : 0,
                ],
                destination: [
                    processCoord(query.destination_lat),
                    processCoord(query.destination_lng),
                    destinationFloor.current.value
                        ? destinationFloor.current.value
                        : 0,
                    destinationUnit.current.value
                        ? destinationUnit.current.value
                        : 0,
                ],
                value: enteredValue,
                fees: enteredFees,
                weight: selectedWeight,
            };
            await clearForm();
            view(query);
            await web3Ctx.handleSubmitRequest(output);
        }
    };

    const clearForm = () => {
        resetNameInput();
        resetPickupInput();
        resetDestinationInput();
        resetValueInput();
        resetFeesInput();
        resetClicked();
        pickupFloor.current.value = "";
        pickupUnit.current.value = "";
        destinationFloor.current.value = "";
        destinationUnit.current.value = "";
        setSelectedWeight("");
    };

    useEffect(() => {
        return async () => {
            if (save) {
                save({
                    ...values,
                    name: nameRef.current,
                    pickup: pickupRef.current,
                    destination: destinationRef.current,
                    value: valueRef.current,
                    fees: feesRef.current,
                    requestSubmit: clickedRef.current ? true : false,
                    // eslint-disable-next-line
                    pickupFloor: pickupFloor.current.value,
                    // eslint-disable-next-line
                    pickupUnit: pickupUnit.current.value,
                    // eslint-disable-next-line
                    destinationFloor: destinationFloor.current.value,
                    // eslint-disable-next-line
                    destinationUnit: destinationUnit.current.value,
                    weight: selectedWeightRef.current,
                });
            }
        };
    }, [save, values]);

    return (
        <Card>
            <form>
                <GridContainer alignItems="center" direction="column">
                    <GridItem xs={10} md={8}>
                        <CustomInput
                            labelText="Object Name"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                onChange: nameChangedHandler,
                                onBlur: nameBlurHandler,
                                value: enteredName,
                            }}
                            error={nameInputHasError}
                        />
                        {nameInputHasError && (
                            <FormHelperText error>
                                Name cannot be empty
                            </FormHelperText>
                        )}
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <AutoComplete
                            labelText="Deliver From"
                            inputProps={{
                                onBlur: pickupBlurHandler,
                            }}
                            error={pickupInputHasError}
                            onInputChange={pickupChangeHandler}
                            buttonChange={resetClicked}
                            value={enteredPickup}
                        />
                        {pickupInputHasError && (
                            <FormHelperText error>
                                Pickup location cannot be empty
                            </FormHelperText>
                        )}
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <GridContainer>
                            <GridItem xs={5}>
                                <CustomInput
                                    labelText="Floor Number"
                                    inputProps={{
                                        type: "number",
                                        inputRef: pickupFloor,
                                        defaultValue: values
                                            ? values.pickupFloor
                                            : "",
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={2} />
                            <GridItem xs={5}>
                                <CustomInput
                                    labelText="Unit Number"
                                    inputProps={{
                                        type: "number",
                                        inputRef: pickupUnit,
                                        defaultValue: values
                                            ? values.pickupUnit
                                            : "",
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <AutoComplete
                            labelText="Deliver To"
                            inputProps={{
                                onBlur: destinationBlurHandler,
                            }}
                            error={destinationInputHasError}
                            onInputChange={destinationChangeHandler}
                            buttonChange={resetClicked}
                            value={enteredDestination}
                        />
                        {destinationInputHasError && (
                            <FormHelperText error>
                                Destination location cannot be empty
                            </FormHelperText>
                        )}
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <GridContainer>
                            <GridItem xs={5}>
                                <CustomInput
                                    labelText="Floor Number"
                                    inputProps={{
                                        type: "number",
                                        inputRef: destinationFloor,
                                        defaultValue: values
                                            ? values.destinationFloor
                                            : "",
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={2} />
                            <GridItem xs={5}>
                                <CustomInput
                                    labelText="Unit Number"
                                    inputProps={{
                                        type: "number",
                                        inputRef: destinationUnit,
                                        defaultValue: values
                                            ? values.destinationUnit
                                            : "",
                                    }}
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
                        <CustomInput
                            labelText="Estimated Value"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                onChange: valueChangeHandler,
                                onBlur: valueBlurHandler,
                                value: enteredValue,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        Tokens
                                    </InputAdornment>
                                ),
                            }}
                            error={valueInputHasError}
                        />
                        {valueInputHasError && (
                            <FormHelperText error>
                                Value must be a valid number
                            </FormHelperText>
                        )}
                    </GridItem>
                    <GridItem xs={10} md={8}>
                        <CustomInput
                            labelText="Fees"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                onChange: feesChangeHandler,
                                onBlur: feesBlurHandler,
                                value: enteredFees,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        Tokens
                                    </InputAdornment>
                                ),
                            }}
                            error={feesInputHasError}
                        />
                        {feesInputHasError && (
                            <FormHelperText error>
                                Fees must be a valid number
                            </FormHelperText>
                        )}
                        {estimatedFees !== 0 && (
                            <FormHelperText>
                                Suggested Fees: {estimatedFees} tokens
                            </FormHelperText>
                        )}
                        {values && values.fees && (
                            <FormHelperText>
                                Suggested Fees: {values.fees} tokens
                            </FormHelperText>
                        )}
                        <FormHelperText>1 Token → 1SGD</FormHelperText>
                    </GridItem>
                    <GridItem xs={10} md={8} style={{ textAlign: "center" }}>
                        <Button
                            color={buttonProps.color}
                            disabled={!formIsValid}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            {buttonProps.text}
                        </Button>
                    </GridItem>
                </GridContainer>
            </form>
        </Card>
    );
}
