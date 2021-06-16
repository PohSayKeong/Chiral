import React, { Fragment, useState } from "react";

import NavPills from "../UI/NavPills/NavPills";
import RequestForm from "./RequestForm";
import Item from "./Item";
import Deliveries from "./Deliveries";

const SideBar = (props) => {
    const [clicked, setClicked] = useState("");
    const viewHandler = (data) => {
        if (window.screen.innerWidth > 960) {
            props.view(data);
        }
        setClicked(data.identifier);
    };

    const items = (
        <Fragment>
            {props.data.map((item) => (
                <Item
                    data={item}
                    key={item.identifier}
                    view={viewHandler}
                    clicked={clicked}
                />
            ))}
        </Fragment>
    );

    const deliveries = (
        <Fragment>
            {props.myData.map((item) => (
                <Deliveries myData={item} key={item.identifier} />
            ))}
        </Fragment>
    );

    return (
        <NavPills
            color="warning"
            tabs={[
                {
                    tabButton: "New Request",
                    tabContent: <RequestForm updateData={props.updateData} />,
                },
                {
                    tabButton: "Deliver",
                    tabContent: { ...items },
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
