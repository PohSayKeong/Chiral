import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./aboutStyles";
import Grow from "@material-ui/core/Grow";
const useStyles = makeStyles(styles);

const SpeechBubble = (props) => {
    const classes = useStyles();
    return (
        <div style={{ marginBottom: "2rem" }}>
            {props.left ? (
                <Grow in={props.scrollPosition > props.target}>
                    <div
                        className={classNames(
                            classes.speechBubble,
                            classes.left
                        )}
                    >
                        <p>{props.text}</p>
                    </div>
                </Grow>
            ) : (
                <div className={classes.speechContainerRight}>
                    <Grow in={props.scrollPosition > props.target}>
                        <div
                            className={classNames(
                                classes.speechBubble,
                                classes.right
                            )}
                        >
                            <p>{props.text}</p>
                        </div>
                    </Grow>
                </div>
            )}
        </div>
    );
};

export default SpeechBubble;
