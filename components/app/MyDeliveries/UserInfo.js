import React, { useContext, useState } from "react";
import Card from "UI/Card/Card";
import CardBody from "UI/Card/CardBody";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/Web3-context";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import * as ga from "/lib/ga";

const UserInfo = () => {
    const web3Ctx = useContext(Web3Context);
    const [buttonText, setButtonText] = useState("Wallet Address");
    const handleButtonClick = () => {
        ga.event({ action: "copy_address" });
        navigator.clipboard.writeText(web3Ctx.userAccount);
        setButtonText("Copied");
    };
    return (
        <Card>
            <CardBody>
                <GridContainer alignItems="center">
                    <GridItem xs={6}>
                        {web3Ctx.newUser ? (
                            <Button
                                onClick={web3Ctx.handleBuyTokens}
                                color="primary"
                                size="sm"
                            >
                                Claim Tokens
                            </Button>
                        ) : (
                            <h3>{web3Ctx.userTokens} Chiral Tokens</h3>
                        )}
                    </GridItem>
                    <GridItem xs={6} justifyContent="flex-end" container>
                        <Button
                            onClick={handleButtonClick}
                            color="info"
                            size="sm"
                        >
                            {buttonText}
                        </Button>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};
export default UserInfo;
