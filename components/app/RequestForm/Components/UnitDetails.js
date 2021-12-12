import React, { Fragment } from "react";
import CustomInput from "UI/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";

const UnitDetails = (props) => {
    return (
        <Fragment>
            <CustomInput
                labelText={`${props.type} Number`}
                inputProps={{
                    type: "number",
                    onChange: props.valueChangeHandler,
                    onBlur: props.inputBlurHandler,
                    value: props.value,
                }}
            />
            {props.hasError && (
                <FormHelperText error>Must be a valid integer</FormHelperText>
            )}
        </Fragment>
    );
};

export default UnitDetails;
