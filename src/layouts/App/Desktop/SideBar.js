import React from "react";
import NavPills from "../../../UI/NavPills/NavPills";
import RequestForm from "../../../components/RequestForm/RequestForm";
import RequestsContainer from "components/Requests/RequestsContainer";
import DeliveriesContainer from "components/MyDeliveries/DeliveriesContainer";

const SideBar = () => {
    return (
        <NavPills
            color="warning"
            tabs={[
                {
                    tabButton: "New Request",
                    tabContent: <RequestForm />,
                },
                {
                    tabButton: "Deliver",
                    tabContent: <RequestsContainer />,
                },
                {
                    tabButton: "My Deliveries",
                    tabContent: <DeliveriesContainer />,
                },
            ]}
            horizontal={{}}
        />
    );
};

export default SideBar;
