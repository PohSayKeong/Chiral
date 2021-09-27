import React, { useContext, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import Desktop from "layouts/App/Desktop/Desktop";
import Mobile from "layouts/App/Mobile/Mobile";
import Web3Context from "store/Web3-context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const RequestApp = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });
    const web3Ctx = useContext(Web3Context);
    return (
        <Fragment>
            {!web3Ctx.userAccount && (
                <Backdrop style={{ zIndex: "1" }} open={true}>
                    <CircularProgress />
                </Backdrop>
            )}
            {isDesktopOrLaptop && <Desktop />}
            {!isDesktopOrLaptop && <Mobile />}
        </Fragment>
    );
};

export default RequestApp;
