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
                (
                    (parseInt(web3State.userTokens) + parseInt(amount)) *
                    1e18
                ).toString()
            )
            .send({
                from: web3State.account,
                gas: 50000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
    } catch {
        dispatch(uiActions.showNotification({ status: "failed" }));
    }
};

export default buyTokens;
