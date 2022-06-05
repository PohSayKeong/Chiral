import Dialog from "@material-ui/core/Dialog";
import Button from "UI/CustomButtons/Button";
import { makeStyles } from "@material-ui/styles";
import CopyAddress from "UI/CopyAddress/CopyAddress";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    welcomeText: {
        padding: "2rem",
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
    helperText: {
        padding: "1rem",
        fontSize: "1rem",
        color: "gray",
        textAlign: "center",
    },
    claimButton: {
        margin: "3rem",
        width: "60%",
    },
});

const ClaimTokenModal = (props) => {
    const classes = useStyles();
    return (
        <Dialog open maxWidth="md">
            <div className={classes.content}>
                <div className={classes.welcomeText}>Welcome to Chiral!</div>
                <div className={classes.helperText}>
                    Ensure that your wallet is funded
                    <br /> <CopyAddress user={props.user} />
                    <br /> Get some test MATIC{" "}
                    <a
                        href="https://faucet.polygon.technology/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>
                </div>
                <div className={classes.helperText}>
                    Get some tokens to get started
                    <br />
                    You will have to sign <strong>two</strong> transactions
                    <br />
                    Do reach out to us on{" "}
                    <a
                        href="https://discord.gg/yez8zAvvC2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discord
                    </a>{" "}
                    if you run into any issues :)
                </div>
                <Button
                    type="button"
                    color="primary"
                    className={classes.claimButton}
                    onClick={() => props.handleClaimTokens()}
                >
                    Claim Tokens
                </Button>
            </div>
        </Dialog>
    );
};

export default ClaimTokenModal;
