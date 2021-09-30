import React from "react";
import { useSelector } from "react-redux";

// core components
import GridContainer from "../../UI/Grid/GridContainer";
import OpenChatButton from "components/Chat/OpenChatButton";
import RequestButton from "./RequestButton";
import InfoCard from "components/InfoCard";

const Request = (props) => {
    const chat = useSelector((state) => state.chat.chatInfo);

    return (
        <GridContainer alignItems="center" direction="column">
            <InfoCard data={props.data} details={false} />
            <GridContainer justify="center">
                <RequestButton data={props.data} />
                {(!chat || chat.index !== props.data.index) && (
                    <OpenChatButton data={props.data} />
                )}
            </GridContainer>
        </GridContainer>
    );
};

export default Request;
