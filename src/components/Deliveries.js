import React, { useContext, useState } from "react";

// @material-ui/icons
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoArea from "../UI/InfoArea/InfoArea";
import Card from "../UI/Card/Card";
import Button from "../UI/CustomButtons/Button";
import GridContainer from "../UI/Grid/GridContainer";
import Web3Context from "../store/Web3-context";

const Deliveries = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");
    const web3Ctx = useContext(Web3Context);

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.myData.pickup_lng},${props.myData.pickup_lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
        .then((resp) => resp.json())
        .then((data) => setOrigin(data.features[0].place_name));

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.myData.destination_lng},${props.myData.destination_lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
        .then((resp) => resp.json())
        .then((data) => setDestination(data.features[0].place_name));

    const clickHandler = () => {
        if (
            web3Ctx.userAccount === props.myData.pickupAddress &&
            props.myData._step === "2"
        ) {
            web3Ctx.handleReceived(props.myData);
        }
        if (web3Ctx.userAccount === props.myData.deliveryAddress) {
            web3Ctx.handleDelivered(props.myData);
        }
    };

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoArea
                    title={props.myData.identifier}
                    description={`${origin} -> ${destination}`}
                    icon={LocalShippingIcon}
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
