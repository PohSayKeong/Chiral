import React, { useContext, useState } from "react";

// @material-ui/icons
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoArea from "../../UI/InfoArea/InfoArea";
import Card from "../../UI/Card/Card";
import Button from "../../UI/CustomButtons/Button";
import GridContainer from "../../UI/Grid/GridContainer";
import Web3Context from "../../store/Web3-context";
import useAsync from "hooks/use-async";
import fetchAddress from "helpers/fetchAddress";

const Deliveries = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");
    const web3Ctx = useContext(Web3Context);

    // convert latlong to address
    const fetchPickup = () =>
        fetchAddress(props.myData.pickup_lng, props.myData.pickup_lat);
    const fetchDestination = () =>
        fetchAddress(
            props.myData.destination_lng,
            props.myData.destination_lat
        );
    useAsync(fetchPickup, setOrigin);
    useAsync(fetchDestination, setDestination);

    const clickHandler = () => {
        props.view(props.myData);
        if (
            web3Ctx.userAccount === props.myData.pickupAddress &&
            props.myData._step === "2"
        ) {
            web3Ctx.handleReceived(props.myData);
        }
        if (web3Ctx.userAccount === props.myData.deliveryAddress) {
            web3Ctx.handleDelivered(props.myData);
        }
        if (
            web3Ctx.userAccount === props.myData.pickupAddress &&
            props.myData._step === "0"
        ) {
            web3Ctx.handleCancelled(props.myData);
        }
    };

    let icon;
    switch (props.myData._weight) {
        case "0":
            icon = DirectionsWalkIcon;
            break;
        case "1":
            icon = MotorcycleIcon;
            break;
        case "2":
            icon = LocalShippingIcon;
            break;
        default:
            icon = LocalShippingIcon;
    }

    const pickupDetails = `${
        props.myData.pickup_floor !== "0" ? `#${props.myData.pickup_floor}` : ""
    }${props.myData.pickup_unit !== "0" ? `-${props.myData.pickup_unit}` : ""}`;

    const destinationDetails = `${
        props.myData.destination_floor !== "0"
            ? `#${props.myData.destination_floor}`
            : ""
    }${
        props.myData.destination_unit !== "0"
            ? `-${props.myData.destination_unit}`
            : ""
    }`;

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoArea
                    title={props.myData.identifier}
                    description={`${origin} ${pickupDetails} -> ${destination} ${destinationDetails}`}
                    icon={icon}
                    iconColor="primary"
                    value={props.myData.value}
                />
                <Button type="button" color="primary" onClick={clickHandler}>
                    {web3Ctx.userAccount === props.myData.pickupAddress &&
                        props.myData._step === "0" &&
                        "Cancel"}
                    {web3Ctx.userAccount === props.myData.pickupAddress &&
                        props.myData._step === "1" &&
                        "Delivering"}
                    {web3Ctx.userAccount === props.myData.pickupAddress &&
                        props.myData._step === "2" &&
                        "Received"}
                    {web3Ctx.userAccount === props.myData.deliveryAddress &&
                        "Delivered"}
                </Button>
            </GridContainer>
        </Card>
    );
};
export default Deliveries;
