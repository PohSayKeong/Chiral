import React, { Fragment } from "react";
import CustomInput from "UI/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";

const Name = (props) => {
    return (
        <Fragment>
            <CustomInput
                labelText="Object Name"
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    onChange: props.valueChangeHandler,
                    onBlur: props.inputBlurHandler,
                    value: props.value,
                }}
                error={props.hasError}
            />
            {props.hasError && (
                <FormHelperText error>Name cannot be empty</FormHelperText>
            )}
        </Fragment>
    );
};

export default Name;
