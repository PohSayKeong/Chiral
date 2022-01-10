import React from "react";
import Button from "UI/CustomButtons/Button";

const Submit = (props) => {
    const buttonProps = {
        text: props.clicked
            ? props.enoughTokens
                ? "Confirm"
                : "Not enough tokens"
            : "Show on map",
        color: props.clicked ? "primary" : "info",
    };
    return (
        <Button
            color={buttonProps.color}
            disabled={!props.formIsValid}
            onClick={() => {
                props.handleSubmit();
            }}
        >
            {buttonProps.text}
        </Button>
    );
};

export default Submit;
