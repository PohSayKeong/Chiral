import React, { Suspense, lazy } from "react";

import "./App.css";
import RequestApp from "layouts/App/RequestApp";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Landing = lazy(() => import("layouts/Landing/Landing"));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div></div>}>
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
            </Suspense>
        </Router>
    );
};

export default App;
