import React from "react";
import CustomInput from "UI/CustomInput/CustomInput";

const UnitDetails = (props) => {
    return (
        <CustomInput
            labelText={`${props.type} Number`}
            inputProps={{
                type: "number",
                onChange: props.valueChangeHandler,
                onBlur: props.inputBlurHandler,
                value: props.value,
            }}
        />
    );
};

export default UnitDetails;
