import React, { useState } from "react";
import AutocompletePlace from "components/AutoComplete";
import useInput from "hooks/use-input.js";
import Card from "UI/Card/Card";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import Button from "UI/CustomButtons/Button";
import fetchLatLng from "helpers/fetchLatLng";
import { requestActions } from "store/request-slice";
import { useDispatch, useSelector } from "react-redux";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import InputAdornment from "@material-ui/core/InputAdornment";

const RequestsSearchBox = () => {
    const filterData = useSelector((state) => state.request.filterData);
    const userCoord = useSelector((state) => state.user.location);
    const pickupProps = useInput(
        () => {},
        filterData.pickup ? filterData.pickup : ""
    );
    const destinationProps = useInput(
        () => {},
        filterData.destination ? filterData.destination : ""
    );
    const dispatch = useDispatch();
    const [filtering, setFiltering] = useState(false);

    // User selected pickup as current location
    const setCurrentLocation = () => {
        pickupProps.valueChangeHandler({
            target: { value: "Current Location" },
        });
    };

    const CurrentLocationButton = userCoord ? (
        <InputAdornment position="end">
            <Button size="sm" color="transparent" onClick={setCurrentLocation}>
                <MyLocationIcon />
            </Button>
        </InputAdornment>
    ) : (
        ""
    );

    const handleFilter = async () => {
        let pickupData;
        if (pickupProps.value === "Current Location") {
            pickupData = [userCoord.lng, userCoord.lat];
        } else {
            pickupData =
                pickupProps.value !== ""
                    ? await fetchLatLng(pickupProps.value)
                    : null;
        }
        const destinationData =
            destinationProps.value !== ""
                ? await fetchLatLng(destinationProps.value)
                : null;
        if (pickupProps.value !== "" || destinationProps.value !== "") {
            setFiltering(true);
        }
        dispatch(
            requestActions.setFilterData({
                pickupCoord: Array.isArray(pickupData)
                    ? pickupData
                    : pickupData && pickupData.features[0]
                    ? pickupData.features[0].geometry.coordinates
                    : null,
                destinationCoord:
                    destinationData && destinationData.features[0]
                        ? destinationData.features[0].geometry.coordinates
                        : null,
                pickup: pickupProps.value,
                destination: destinationProps.value,
            })
        );
    };

    const handleClear = () => {
        pickupProps.reset();
        destinationProps.reset();
        setFiltering(false);
        dispatch(requestActions.setFilterData({}));
    };

    return (
        <Card>
            <GridContainer
                alignItems="center"
                justify="space-evenly"
                spacing={2}
            >
                <GridItem xs={7} style={{ paddingBottom: "2rem" }}>
                    <div>
                        <AutocompletePlace
                            labelText="Pickup"
                            onInputChange={(e) => {
                                setFiltering(false);
                                pickupProps.valueChangeHandler(e);
                            }}
                            value={pickupProps.value}
                            inputProps={{
                                endAdornment: CurrentLocationButton,
                            }}
                        />
                    </div>
                    <AutocompletePlace
                        labelText="Destination"
                        onInputChange={(e) => {
                            setFiltering(false);
                            destinationProps.valueChangeHandler(e);
                        }}
                        value={destinationProps.value}
                    />
                </GridItem>
                <GridItem xs={3}>
                    {filtering ? (
                        <Button
                            type="button"
                            color="primary"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            color="primary"
                            onClick={handleFilter}
                        >
                            Filter
                        </Button>
                    )}
                </GridItem>
            </GridContainer>
        </Card>
    );
};

export default RequestsSearchBox;
