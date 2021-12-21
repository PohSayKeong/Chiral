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
import ReportConfirmationModal from "./ReportConfirmationModal";

import styles from "styles/jss/material-kit-react/modalStyle";
import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function RportConfirmationModal(props) {
    const [modal, setModal] = useState(false);
    const classes = useStyles();

    return (
        <div>
            <Button
                {...props}
                color="transparent"
                onClick={() => setModal(true)}
                className={props.btnClass}
                style={{ position: "absolute", right: 0, top: 0, fontSize: 32 }}
            >
                ⚠
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
                    <h2 className={classes.modalTitle}>
                        Something went wrong with the delivery?
                    </h2>
                </DialogTitle>
                <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                >
                    <p>
                        Please read through the following pointers before
                        proceeding:
                        <br />
                        <br />
                        1. There is <strong>no way</strong> to cancel a report
                        <br />
                        2. The conflict will be resolved by a neutral third
                        party
                        <br />
                        3. Who the tokens are awarded to is up to the discretion
                        of aforementioned third party
                        <br />
                        <br />
                        By proceeding, you agree to the terms stated above.
                    </p>
                </DialogContent>
                <DialogActions
                    className={
                        classes.modalFooter + " " + classes.modalFooterCenter
                    }
                >
                    <Button onClick={() => setModal(false)}>Cancel</Button>
                    <ReportConfirmationModal
                        setParentModal={setModal}
                        clickHandler={props.clickHandler}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}
