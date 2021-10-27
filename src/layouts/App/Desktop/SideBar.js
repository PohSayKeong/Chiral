import React from "react";
import NavPills from "../../../UI/NavPills/NavPills";
import RequestForm from "../../../components/RequestForm/RequestForm";
import RequestsContainer from "components/Requests/RequestsContainer";
import DeliveriesContainer from "components/MyDeliveries/DeliveriesContainer";
import Card from "UI/Card/Card";

const ContentWrapper = (props) => (
    <div
        style={{
            overflow: "auto",
            height: "95%",
            padding: "1rem",
        }}
    >
        {props.children}
    </div>
);
const SideBar = () => {
    return (
        <NavPills
            color="warning"
            tabs={[
                {
                    tabButton: "New Request",
                    tabContent: (
                        <ContentWrapper>
                            <Card>
                                <RequestForm />
                            </Card>
                        </ContentWrapper>
                    ),
                },
                {
                    tabButton: "Deliver",
                    tabContent: (
                        <ContentWrapper>
                            <RequestsContainer />
                        </ContentWrapper>
                    ),
                },
                {
                    tabButton: "My Deliveries",
                    tabContent: (
                        <ContentWrapper>
                            <DeliveriesContainer />
                        </ContentWrapper>
                    ),
                },
            ]}
            horizontal={{}}
        />
    );
};

export default SideBar;
