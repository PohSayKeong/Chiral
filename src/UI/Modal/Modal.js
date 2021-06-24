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
import Button from "../CustomButtons/Button";
import Input from "@material-ui/core/Input";

import styles from "../../assets/jss/material-kit-react/modalStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function Modal(props) {
    const [modal, setModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const classes = useStyles();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleConfirmClick = () => {
        setModal(false);
        props.confirmClick(amount);
    };

    return (
        <div>
            <Button
                color="transparent"
                round
                onClick={() => setModal(true)}
                className={props.btnClass}
            >
                {props.tokens} tokens
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
                    <h4 className={classes.modalTitle}>Buy Chiral Tokens</h4>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    <h5>
                        I want to buy{" "}
                        <Input
                            inputProps={{ padding: "0" }}
                            onChange={handleAmountChange}
                            value={amount}
                        />{" "}
                        tokens
                    </h5>
                    <h4>Total cost: {amount !== 0 && amount + " SGD"}</h4>
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                    }
                >
                    <Button onClick={() => setModal(false)}>Never Mind</Button>
                    <Button onClick={handleConfirmClick} color="success">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
