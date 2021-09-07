import React from "react";

import "./App.css";
import { useMediaQuery } from "react-responsive";
import Desktop from "layouts/App/Desktop/Desktop";
import Mobile from "layouts/App/Mobile/Mobile";
import Landing from "layouts/Landing/Landing";
import Web3Provider from "./store/Web3Provider";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    return (
        <Router>
            <Switch>
                <Route path="/app">
                    <Provider store={store}>
                        <Web3Provider>
                            <div className="App">
                                {isDesktopOrLaptop && <Desktop />}
                                {!isDesktopOrLaptop && <Mobile />}
                            </div>
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
