import React, { Fragment } from "react";
import CustomInput from "UI/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";

const Value = (props) => {
    return (
        <Fragment>
            <CustomInput
                labelText="Object Value"
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    type: "number",
                    onChange: props.valueChangeHandler,
                    onBlur: props.inputBlurHandler,
                    value: props.value,
                    endAdornment: (
                        <InputAdornment position="end">Tokens</InputAdornment>
                    ),
                }}
                error={props.hasError}
            />
            {props.hasError ? (
                <FormHelperText error>
                    Value must be a valid integer
                </FormHelperText>
            ) : (
                <FormHelperText>
                    Compensation when package is lost
                </FormHelperText>
            )}
        </Fragment>
    );
};

export default Value;
