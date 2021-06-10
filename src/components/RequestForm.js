import React, { useContext, useRef } from "react";
// core components
import GridContainer from "../UI/Grid/GridContainer.js";
import GridItem from "../UI/Grid/GridItem.js";
import CustomInput from "../UI/CustomInput/CustomInput";
import Button from "../UI/CustomButtons/Button";
import Card from "../UI/Card/Card";
import AutoComplete from "./AutoComplete";
import Web3Context from "../store/Web3-context";

const fetchLatLng = async (location) => {
    const locationResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    );
    return await locationResponse.json();
};

export default function RequestForm() {
    let name = useRef("");
    let pickup = useRef("");
    let destination = useRef("");
    let value = useRef(0);
    let fees = useRef(0);
    const web3Ctx = useContext(Web3Context);

    const handleSubmit = async () => {
        let output = {
            name: "",
            pickup_lat: 0,
            pickup_lng: 0,
            destination_lat: 0,
            destination_lng: 0,
            value: 0,
            fees: 0,
        };
        output.name = name.current.value;
        output.value = value.current.value;
        output.fees = fees.current.value;
        const pickupData = await fetchLatLng(pickup.current.value);
        output.pickup_lat = Math.trunc(
            pickupData.features[0].center[1] * Math.pow(10, 15)
        ).toString();
        output.pickup_lng = Math.trunc(
            pickupData.features[0].center[0] * Math.pow(10, 15)
        ).toString();
        const destinationData = await fetchLatLng(destination.current.value);
        output.destination_lat = Math.trunc(
            destinationData.features[0].center[1] * Math.pow(10, 15)
        ).toString();
        output.destination_lng = Math.trunc(
            destinationData.features[0].center[0] * Math.pow(10, 15)
        ).toString();
        await web3Ctx.handleSubmitRequest(output);
        await clearForm();
    };

    const clearForm = () => {
        name.current.value = "";
        pickup.current.value = "";
        destination.current.value = "";
        value.current.value = "";
        fees.current.value = "";
    };

    return (
        <Card>
            <form>
                <GridContainer alignItems="center" direction="column">
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="Object Name"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                inputRef: name,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <AutoComplete
                            labelText="Deliver From"
                            inputProps={{
                                inputRef: pickup,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <AutoComplete
                            labelText="Deliver To"
                            inputProps={{
                                inputRef: destination,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="Estimated Value"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                inputRef: value,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="Fees"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                inputRef: fees,
                            }}
                        />
                    </GridItem>
                    <GridItem
                        xs={12}
                        sm={12}
                        md={8}
                        style={{ textAlign: "center" }}
                    >
                        <Button
                            color="primary"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Submit
                        </Button>
                    </GridItem>
                </GridContainer>
            </form>
        </Card>
    );
}
