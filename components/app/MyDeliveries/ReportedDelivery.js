import React from "react";
import { useSelector } from "react-redux";

// core components
import Card from "UI/Card/Card";
import GridContainer from "UI/Grid/GridContainer";
import OpenChatButton from "components/app/Chat/OpenChatButton";
import InfoCard from "components/app/InfoCard";

const ReportedDelivery = (props) => {
    const chat = useSelector((state) => state.chat.chatInfo);

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoCard data={props.data} details={true} />
                <GridContainer justifyContent="center">
                    <p style={{ padding: "0px 8px", fontWeight: "bold" }}>
                        REPORTED
                    </p>
                    {(!chat || chat.index !== props.data.index) && (
                        <OpenChatButton data={props.data} />
                    )}
                </GridContainer>
            </GridContainer>
        </Card>
    );
};
export default ReportedDelivery;
