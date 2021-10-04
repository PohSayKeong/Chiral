import React, { Suspense, lazy } from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const RequestAppContainer = lazy(() =>
    import("layouts/App/RequestAppContainer")
);
const Landing = lazy(() => import("layouts/Landing/Landing"));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div></div>}>
                <Switch>
                    <Route path="/app">
                        <RequestAppContainer />
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
