import React, { Fragment } from "react";
import AutocompletePlace from "../AutoComplete";
import FormHelperText from "@material-ui/core/FormHelperText";

const Location = (props) => {
    const text = props.type === "Pickup" ? "Deliver From" : "Deliver To";
    return (
        <Fragment>
            <AutocompletePlace
                labelText={text}
                inputProps={{
                    onBlur: props.inputBlurHandler,
                }}
                error={props.hasError}
                onInputChange={(e) => {
                    props.valueChangeHandler(e);
                    props.resetClicked(false);
                }}
                value={props.value}
            />
            {props.hasError && (
                <FormHelperText error>
                    {props.type} location cannot be empty
                </FormHelperText>
            )}
        </Fragment>
    );
};

export default Location;
