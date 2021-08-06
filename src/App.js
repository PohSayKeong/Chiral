import React from "react";

import "./App.css";
import { useMediaQuery } from "react-responsive";
import RequestsDesktop from "layouts/Desktop/RequestsDesktop";
import Mobile from "layouts/Mobile/Mobile";

const App = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    return (
        <div className="App">
            {isDesktopOrLaptop && <RequestsDesktop />}
            {!isDesktopOrLaptop && <Mobile />}
        </div>
    );
};

export default App;
