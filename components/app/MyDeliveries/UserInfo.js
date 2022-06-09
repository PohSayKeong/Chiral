import React, { useContext } from "react";
import Card from "UI/Card/Card";
import CardBody from "UI/Card/CardBody";
import Button from "UI/CustomButtons/Button";
import Web3Context from "store/web3/Web3-context";
import GridContainer from "UI/Grid/GridContainer";
import GridItem from "UI/Grid/GridItem";
import CopyAddress from "UI/CopyAddress/CopyAddress";

const UserInfo = () => {
    const web3Ctx = useContext(Web3Context);

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
                        <CopyAddress user={web3Ctx.userAccount} />
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};
export default UserInfo;
