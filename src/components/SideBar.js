import React, { Fragment, useState } from "react";

import NavPills from "../UI/NavPills/NavPills";
import RequestForm from "./RequestForm";
import Item from "./Item";

const SideBar = (props) => {
    const [clicked, setClicked] = useState("");
    const viewHandler = (data) => {
        props.view(data);
        setClicked(data.name);
    };

    const items = (
        <Fragment>
            {props.data.map((item) => (
                <Item
                    data={item}
                    key={item.name}
                    view={viewHandler}
                    clicked={clicked}
                />
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
            ]}
            horizontal={{}}
        />
    );
};

export default SideBar;
