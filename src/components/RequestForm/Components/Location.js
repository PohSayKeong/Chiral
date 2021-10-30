import React, { Fragment } from "react";
import AutocompletePlace from "components/AutoComplete";
import FormHelperText from "@material-ui/core/FormHelperText";

const Location = (props) => {
    let text;
    if (props.pickup) {
        if (props.sendingItem) {
            text = "Pickup Package From";
        } else {
            text = "Purchase Item From";
        }
    } else {
        text = "Deliver To";
    }
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
