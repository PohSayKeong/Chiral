import React from "react";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

// core components
import SnackbarContent from "../Snackbar/SnackbarContent.js";
import Clearfix from "../Clearfix/Clearfix.js";

export default function Notification(props) {
    return (
        <div style={{ zIndex: "1", position: "absolute", width: "100%" }}>
            {props.status === "pending" && (
                <SnackbarContent
                    message={
                        <span>
                            <b> Pending:</b> Please sign the transaction and
                            wait for it to be uploaded on the blockchain.
                        </span>
                    }
                    close
                    color="info"
                    icon="pending"
                />
            )}
            {props.status === "success" && (
                <SnackbarContent
                    message={
                        <span>
                            <b>Success:</b> Your transaction has been
                            successfully uploaded on the blockchain.
                        </span>
                    }
                    close
                    color="success"
                    icon={Check}
                />
            )}
            {props.status === "failed" && (
                <SnackbarContent
                    message={
                        <span>
                            <b>Error:</b> Something went wrong and your
                            transaction was not uploaded on the blockchain.
                        </span>
                    }
                    close
                    color="danger"
                    icon={ErrorIcon}
                />
            )}
            <Clearfix />
        </div>
    );
}
