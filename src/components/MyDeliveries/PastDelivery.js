import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "UI/Badge/Badge";
import { makeStyles } from "@material-ui/core/styles";
import PastDeliveryInfo from "./PastDeliveryInfo";

const useStyles = makeStyles((theme) => ({
    MuiAccordionroot: {
        "&.MuiAccordion-root:before": {
            backgroundColor: "white",
        },
        width: "95%",
        marginBottom: "20px",
        borderRadius: "6px",
    },
    MuiAccordiondetails: {
        flexDirection: "column",
    },
}));

const PastDelivery = (props) => {
    const { identifier, fees, deliveryAddress } = props.data;
    const isCourier = props.userAddress === deliveryAddress;
    const classes = useStyles();
    return (
        <Accordion
            classes={{
                root: classes.MuiAccordionroot,
            }}
            TransitionProps={{ unmountOnExit: true }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ flexBasis: "100%" }}>
                    {identifier}
                </Typography>
                <Badge color={isCourier ? "success" : "rose"}>
                    {fees} tokens
                </Badge>
            </AccordionSummary>
            <AccordionDetails
                classes={{
                    root: classes.MuiAccordiondetails,
                }}
            >
                <PastDeliveryInfo data={props.data} />
            </AccordionDetails>
        </Accordion>
    );
};

export default PastDelivery;
