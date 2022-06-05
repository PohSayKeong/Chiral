import { useState } from "react";
import Button from "UI/CustomButtons/Button";
import * as ga from "/lib/ga";

const CopyAddress = ({ user }) => {
    const [buttonText, setButtonText] = useState("Wallet Address");
    const handleButtonClick = () => {
        ga.event({ action: "copy_address" });
        navigator.clipboard.writeText(user);
        setButtonText("Copied");
    };
    return (
        <Button onClick={handleButtonClick} color="info" size="sm">
            {buttonText}
        </Button>
    );
};

export default CopyAddress;
