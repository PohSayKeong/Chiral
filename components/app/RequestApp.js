import React, { useContext, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import Web3Context from "store/web3/Web3-context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import dynamic from "next/dynamic";
import ClaimTokenModal from "./ClaimTokenModal";

const Desktop = dynamic(() => import("./Desktop/Desktop"));
const Mobile = dynamic(() => import("./Mobile/Mobile"));

const RequestApp = () => {
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
            {web3Ctx.newUser && (
                <ClaimTokenModal handleClaimTokens={web3Ctx.handleBuyTokens} />
            )}
            {isDesktopOrLaptop && <Desktop />}
            {!isDesktopOrLaptop && <Mobile />}
        </Suspense>
    );
};

export default RequestApp;
