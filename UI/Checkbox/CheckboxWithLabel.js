import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import styles from "styles/jss/material-kit-react/customCheckboxRadioSwitch.js";
import { makeStyles } from "@material-ui/core/styles";

const CheckboxWithLabel = (props) => {
    const useStyles = makeStyles({ ...styles, ...props.classes });
    const classes = useStyles();
    const handleToggle = () => {
        props.toggle();
    };
    return (
        <FormControlLabel
            control={
                <Checkbox
                    tabIndex={-1}
                    checked={props.isChecked}
                    onClick={handleToggle}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{ checked: classes.checked }}
                />
            }
            classes={{ label: classes.label, root: classes.root }}
            label={props.label}
        />
    );
};

export default CheckboxWithLabel;
