import React, { Fragment } from "react";
import CustomInput from "UI/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";

const Fees = (props) => {
    return (
        <Fragment>
            <CustomInput
                labelText={`Suggested Fees: ${props.estimatedFees} Tokens`}
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
                    Fees must be a valid integer
                </FormHelperText>
            ) : (
                <FormHelperText>Amount paid to courier</FormHelperText>
            )}
        </Fragment>
    );
};

export default Fees;
