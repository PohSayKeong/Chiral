import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../CustomButtons/Button";

import styles from "styles/jss/material-kit-react/modalStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function CustomModal({
    children = "Modal",
    color = "primary",
    round = false,
    title = "Modal Title",
    content = "Modal content",
    cancelClickContent = "Cancel",
    confirmClickContent = "Confirm",
    cancelClickHandler = () => {},
    confirmClickHandler = () => {},
}) {
    const [modal, setModal] = useState(false);
    const classes = useStyles();

    const handleCancelClick = () => {
        setModal(false);
        cancelClickHandler();
    };

    const handleConfirmClick = () => {
        setModal(false);
        confirmClickHandler();
    };

    return (
        <div>
            <Button color={color} round={round} onClick={() => setModal(true)}>
                {children}
            </Button>
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal,
                }}
                open={modal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModal(false)}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description"
            >
                <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h2 className={classes.modalTitle}>{title}</h2>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    <p>{content}</p>
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                    }
                >
                    <Button onClick={handleCancelClick}>
                        {cancelClickContent}
                    </Button>
                    <Button onClick={handleConfirmClick} color="success">
                        {confirmClickContent}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
