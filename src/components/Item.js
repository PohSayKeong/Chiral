import React, { useState } from "react";

// @material-ui/icons
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

// core components
import InfoArea from "../UI/InfoArea/InfoArea";
import Card from "../UI/Card/Card";
import Button from "../UI/CustomButtons/Button";
import GridContainer from "../UI/Grid/GridContainer";

const Item = (props) => {
    const [origin, setOrigin] = useState("Loading");
    const [destination, setDestination] = useState("Loading");
    const [buttonProps, setButtonProps] = useState({
        text: "View on map",
        color: "primary",
        clicked: false,
    });
    if (props.clicked !== props.data.name && buttonProps.clicked === true) {
        setButtonProps({
            ...buttonProps,
            text: "View on map",
            color: "primary",
            clicked: false,
        });
    }

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.data.pickup.lng},${props.data.pickup.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
        .then((resp) => resp.json())
        .then((data) => setOrigin(data.features[0].place_name));

    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.data.destination.lng},${props.data.destination.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    )
        .then((resp) => resp.json())
        .then((data) => setDestination(data.features[0].place_name));

    const viewHandler = () => {
        props.view(props.data);
        if (buttonProps.clicked === false) {
            setButtonProps({
                ...buttonProps,
                text: "Accept",
                color: "warning",
                clicked: true,
            });
        }
    };

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoArea
                    title={props.data.name}
                    description={`${origin} -> ${destination}`}
                    icon={LocalShippingIcon}
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
