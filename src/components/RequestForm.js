import React, { useRef } from "react";
// core components
import GridContainer from "../UI/Grid/GridContainer.js";
import GridItem from "../UI/Grid/GridItem.js";
import CustomInput from "../UI/CustomInput/CustomInput";
import Button from "../UI/CustomButtons/Button";
import Card from "../UI/Card/Card";
import AutoComplete from "./AutoComplete";

const fetchLatLng = async (location) => {
    const locationResponse = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    );
    return await locationResponse.json();
};

export default function RequestForm(props) {
    const handleSubmit = async () => {
        let output = { name: "", pickup: {}, destination: {}, value: 0 };
        output.name = name.current.value;
        output.value = value.current.value;
        const pickupData = await fetchLatLng(pickup.current.value);
        output.pickup = {
            lat: pickupData.features[0].center[1],
            lng: pickupData.features[0].center[0],
        };
        const destinationData = await fetchLatLng(destination.current.value);
        output.destination = {
            lat: destinationData.features[0].center[1],
            lng: destinationData.features[0].center[0],
        };
        await props.updateData(output);
        await clearForm();
    };

    const clearForm = () => {
        name.current.value = "";
        pickup.current.value = "";
        destination.current.value = "";
        value.current.value = "";
    };

    let name = useRef("");
    let pickup = useRef("");
    let destination = useRef("");
    let value = useRef(0);

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
