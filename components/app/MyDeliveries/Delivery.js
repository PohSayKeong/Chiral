import React from "react";
import { useSelector } from "react-redux";

// core components
import Card from "UI/Card/Card";
import GridContainer from "UI/Grid/GridContainer";
import DeliveriesButton from "./DeliveriesButton";
import OpenChatButton from "components/app/Chat/OpenChatButton";
import InfoCard from "components/app/InfoCard";
import ReportButton from "./ReportButton";

const Delivery = (props) => {
    const chat = useSelector((state) => state.chat.chatInfo);

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoCard data={props.data} details={true} />
                <GridContainer justifyContent="center">
                    <ReportButton data={props.data} />
                    <DeliveriesButton data={props.data} />
                    {(!chat || chat.index !== props.data.index) && (
                        <OpenChatButton data={props.data} />
                    )}
                </GridContainer>
            </GridContainer>
        </Card>
    );
};
export default Delivery;
