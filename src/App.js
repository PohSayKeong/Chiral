import React from "react";

import "./App.css";
import { useMediaQuery } from "react-responsive";
import RequestsDesktop from "./layouts/RequestsDesktop";
import RequestsMobile from "./layouts/RequestsMobile";

const App = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    return (
        <div className="App">
            {isDesktopOrLaptop && <RequestsDesktop />}
            {!isDesktopOrLaptop && <RequestsMobile />}
        </div>
    );
};

export default App;
