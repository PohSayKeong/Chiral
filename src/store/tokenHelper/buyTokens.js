import { uiActions } from "store/ui-slice";

const buyTokens = async (amount, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.tokenInstance.methods.mint(amount).send({
            from: web3State.accounts[0],
            gas: 30000,
        });
        dispatch(uiActions.showNotification({ status: "success" }));
    } catch {
        dispatch(uiActions.showNotification({ status: "failed" }));
    }
};

export default buyTokens;
