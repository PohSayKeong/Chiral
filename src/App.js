import React from "react";

import "./App.css";
import RequestApp from "layouts/App/RequestApp";
import Landing from "layouts/Landing/Landing";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/app">
                    <Provider store={store}>
                        <Web3Provider>
                            <RequestApp />
                        </Web3Provider>
                    </Provider>
                </Route>
                <Route path="/">
                    <Landing />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
