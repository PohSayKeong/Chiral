import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Intervention from "./Intervention";

const InterventionContainer = () => {
    // Retrieve reported Requests
    // TODO: Retrieve all reported requests
    const myReportedRequests = useSelector(
        (state) => state.request.myReportedRequests
    );

    // Convert to mutable variables
    let reportedRequests = myReportedRequests;
    console.log(reportedRequests);

    return (
        <div>
            {reportedRequests.map((item) => {
                return <Intervention data={item} key={uuidv4()} />;
            })}
        </div>
    );
};

export default InterventionContainer;
