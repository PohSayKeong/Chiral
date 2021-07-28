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

const Item = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");
    const [buttonProps, setButtonProps] = useState({
        text: props.data.fees + " Tokens",
        color: "primary",
        clicked: false,
    });
    const web3Ctx = useContext(Web3Context);

    // Another item is selected, reset current button
    if (props.clicked !== props.data && buttonProps.clicked === true) {
        setButtonProps({
            ...buttonProps,
            text: props.data.fees + " Tokens",
            color: "primary",
            clicked: false,
        });
    }

    // This item is selected, change button to selected state
    if (props.clicked === props.data && buttonProps.clicked === false) {
        setButtonProps({
            ...buttonProps,
            text: "Accept",
            color: "warning",
            clicked: true,
        });
    }

    // convert latlong to address
    const fetchPickup = () =>
        fetchAddress(props.data.pickup_lng, props.data.pickup_lat);
    const fetchDestination = () =>
        fetchAddress(props.data.destination_lng, props.data.destination_lat);
    useAsync(fetchPickup, setOrigin);
    useAsync(fetchDestination, setDestination);

    const viewHandler = () => {
        props.view(props.data, props.id);
        // confirm button has been clicked
        if (buttonProps.clicked === true) {
            web3Ctx.handleAcceptRequest(props.data);
        }
    };

    let icon;
    switch (props.data._weight) {
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

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoArea
                    title={props.data.identifier}
                    description={`${origin} -> ${destination}`}
                    icon={icon}
                    iconColor="primary"
                    value={props.data.value}
                />
                <Button
                    type="button"
                    color={buttonProps.color}
                    onClick={viewHandler}
                >
                    {buttonProps.text}
                </Button>
            </GridContainer>
        </Card>
    );
};
export default Item;
