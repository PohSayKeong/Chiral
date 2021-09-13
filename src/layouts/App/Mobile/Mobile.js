import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RequestsMobile from "./RequestsMobile";
import Chatbox from "components/Chat/Chatbox";
import { useState } from "react";

const Mobile = () => {
    const chat = useSelector((state) => state.chat.chatInfo);
    const [view, setView] = useState({ on: false });

    return (
        <Router>
            <Switch>
                <Route path="/app/chat" exact>
                    <Chatbox info={chat} />
                </Route>
                <Route path="/">
                    <RequestsMobile saveView={setView} view={view} />
                </Route>
            </Switch>
        </Router>
    );
};

export default Mobile;
