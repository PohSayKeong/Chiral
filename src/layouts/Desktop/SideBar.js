import React, { Fragment, useState } from "react";

import NavPills from "../../UI/NavPills/NavPills";
import RequestForm from "../../components/RequestForm/RequestForm";
import Request from "components/Requests/Request";
import Deliveries from "../../components/MyDeliveries/Deliveries";
import { v4 as uuidv4 } from "uuid";

const SideBar = (props) => {
    // clicked tracks the selected request by clicking on sidebar
    const [clicked, setClicked] = useState("");

    const viewHandler = (data) => {
        props.view(data);
        setClicked(data);
    };

    // selected request by clicking on map
    if (props.viewData && props.viewData !== clicked) {
        viewHandler(props.viewData);
    }

    let sortedItems = props.data;
    // move selected item to the front
    if (props.data.includes(props.viewData)) {
        sortedItems = [
            props.viewData,
            ...props.data.filter((item) => item !== props.viewData),
        ];
    }
    const requests = (
        <Fragment>
            {sortedItems.map((item) => (
                <Request
                    data={item}
                    key={uuidv4()}
                    view={viewHandler}
                    clicked={clicked}
                />
            ))}
        </Fragment>
    );

    const deliveries = (
        <Fragment>
            {props.myData.map((item) => (
                <Deliveries data={item} key={uuidv4()} view={viewHandler} />
            ))}
        </Fragment>
    );

    return (
        <NavPills
            color="warning"
            tabs={[
                {
                    tabButton: "New Request",
                    tabContent: <RequestForm view={viewHandler} />,
                },
                {
                    tabButton: "Deliver",
                    tabContent: { ...requests },
                },
                {
                    tabButton: "My Deliveries",
                    tabContent: { ...deliveries },
                },
            ]}
            horizontal={{}}
        />
    );
};

export default SideBar;
