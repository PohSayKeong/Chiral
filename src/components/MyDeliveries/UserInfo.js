import React, { useContext, useState } from "react";
import Card from "UI/Card/Card";
import CardBody from "UI/Card/CardBody";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/Web3-context";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";

const UserInfo = () => {
    const web3Ctx = useContext(Web3Context);
    const [buttonText, setButtonText] = useState("Wallet Address");
    const handleButtonClick = () => {
        navigator.clipboard.writeText(web3Ctx.userAccount);
        setButtonText("Copied");
    };
    return (
        <Card>
            <CardBody>
                <GridContainer alignItems="center">
                    <GridItem xs={6}>
                        <h3>{web3Ctx.userTokens} Chiral Tokens</h3>
                    </GridItem>
                    <GridItem xs={6} justify="flex-end" container>
                        <Button
                            onClick={handleButtonClick}
                            color="primary"
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