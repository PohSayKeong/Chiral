import React, { useContext, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import Web3Context from "store/Web3-context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const Desktop = lazy(() => import("layouts/Intervention/Desktop/Desktop"));
// const Mobile = lazy(() => import("layouts/Intervention/Mobile/Mobile"));

const InterventionApp = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });
    const web3Ctx = useContext(Web3Context);
    return (
        <Suspense fallback={<div></div>}>
            {!web3Ctx.userAccount && (
                <Backdrop style={{ zIndex: "1" }} open={true}>
                    <CircularProgress />
                </Backdrop>
            )}
            {isDesktopOrLaptop && <Desktop />}
            {/* {!isDesktopOrLaptop && <Mobile />} */}
        </Suspense>
    );
};

export default InterventionApp;
