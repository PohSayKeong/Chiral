import React, { Fragment, useState } from "react";
import CustomInput from "UI/CustomInput/CustomInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckboxWithLabel from "UI/Checkbox/CheckboxWithLabel";

const checkboxStyles = {
    root: {
        paddingTop: "27px",
    },
    label: {
        color: "rgba(0, 0, 0, 0.54)",
    },
};

const Value = (props) => {
    const [sendingItem, setSendingItem] = useState(false);
    const toggleSendingItem = () => {
        if (sendingItem) {
            props.reset();
        }
        setSendingItem(!sendingItem);
    };
    return (
        <Fragment>
            <CheckboxWithLabel
                classes={checkboxStyles}
                label="I am sending an item"
                toggle={toggleSendingItem}
            />
            {sendingItem && (
                <>
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
                                <InputAdornment position="end">
                                    Tokens
                                </InputAdornment>
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
                </>
            )}
        </Fragment>
    );
};

export default Value;
