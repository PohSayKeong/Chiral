import { uiActions } from "store/ui-slice";

const buyTokens = async (amount, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.tokenInstance.methods.mint(amount).send({
            from: web3State.account,
            gas: 80000,
        });
        await web3State.tokenInstance.methods
            .approve(
                web3State.requestManagerInstance._address,
                "1000000000000000000000"
            )
            .send({
                from: web3State.account,
                gas: 50000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
        return {
            success: true,
        };
    } catch {
        dispatch(uiActions.showNotification({ status: "failure" }));
        return {
            success: false,
        };
    }
};

export default buyTokens;
