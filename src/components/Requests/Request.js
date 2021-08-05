import React from "react";
import { useSelector } from "react-redux";

// core components
import Card from "../../UI/Card/Card";
import GridContainer from "../../UI/Grid/GridContainer";
import OpenChatButton from "components/Chat/OpenChatButton";
import RequestButton from "./RequestButton";
import InfoCard from "components/InfoCard";

const Request = (props) => {
    const chat = useSelector((state) => state.chat.chatInfo);

    return (
        <Card>
            <GridContainer alignItems="center" direction="column">
                <InfoCard data={props.data} details={false} />
                <GridContainer justify="center">
                    <RequestButton
                        data={props.data}
                        clicked={props.clicked}
                        view={props.view}
                    />
                    {(!chat || chat.index !== props.data.index) && (
                        <OpenChatButton data={props.data} />
                    )}
                </GridContainer>
            </GridContainer>
        </Card>
    );
};

export default Request;
