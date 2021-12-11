import React, { Suspense, lazy } from "react";
import Web3Provider from "store/Web3Provider";
import { Provider } from "react-redux";
import store from "store/index";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const RequestApp = lazy(() => import("layouts/App/RequestApp"));
const InterventionApp = lazy(() =>
    import("layouts/Intervention/InterventionApp")
);
const Landing = lazy(() => import("layouts/Landing/Landing"));

const App = () => {
    return (
        <Provider store={store}>
            <Web3Provider>
                <Router>
                    <Suspense fallback={<div></div>}>
                        <Switch>
                            <Route path="/app">
                                <RequestApp />
                            </Route>
                            <Route path="/intervention">
                                <InterventionApp />
                            </Route>
                            <Route path="/">
                                <Landing />
                            </Route>
                        </Switch>
                    </Suspense>
                </Router>
            </Web3Provider>
        </Provider>
    );
};

export default App;
