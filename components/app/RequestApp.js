import React, { useContext, Suspense, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Web3Context from "store/Web3-context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import dynamic from "next/dynamic";
import Button from "UI/CustomButtons/Button";
import Card from "UI/Card/Card";

const Desktop = dynamic(() => import("./Desktop/Desktop"));
const Mobile = dynamic(() => import("./Mobile/Mobile"));

const RequestApp = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1024px)",
    });
    const web3Ctx = useContext(Web3Context);
    const [showReload, setShowReload] = useState(false);
    useEffect(() => {
        const reloadTimer = setTimeout(() => {
            setShowReload(true);
        }, 30000);
        return () => clearTimeout(reloadTimer);
    }, []);

    return (
        <Suspense fallback={<div></div>}>
            {!web3Ctx.userAccount && (
                <Backdrop style={{ zIndex: "1" }} open={true}>
                    <CircularProgress />
                    {showReload && (
                        <Card
                            style={{
                                position: "absolute",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                background: "rgba(255,255,255,0.8)",
                                bottom: 0,
                            }}
                        >
                            <p>IT'S BEEN A WHILE, TRY RELOADING</p>
                            <Button
                                onClick={() => {
                                    location.reload();
                                }}
                                color="info"
                            >
                                reload
                            </Button>
                        </Card>
                    )}
                </Backdrop>
            )}
            {isDesktopOrLaptop && <Desktop />}
            {!isDesktopOrLaptop && <Mobile />}
        </Suspense>
    );
};

export default RequestApp;
