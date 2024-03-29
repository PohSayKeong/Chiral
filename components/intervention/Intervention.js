import React from "react";
import { useSelector } from "react-redux";

// core components
import Card from "UI/Card/Card";
import GridContainer from "UI/Grid/GridContainer";
import OpenChatButton from "components/app/Chat/OpenChatButton";
import InfoCard from "components/intervention/InfoCard";
import AwardSenderButton from "./AwardSenderButton";
import AwardCourierButton from "./AwardCourierButton";

const Intervention = (props) => {
    const chat = useSelector((state) => state.chat.chatInfo);

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoCard data={props.data} details={true} />
                <GridContainer justifyContent="center">
                    <AwardSenderButton data={props.data} />
                    <AwardCourierButton data={props.data} />
                    {(!chat || chat.index !== props.data.index) && (
                        <OpenChatButton data={props.data} />
                    )}
                </GridContainer>
            </GridContainer>
        </Card>
    );
};
export default Intervention;
