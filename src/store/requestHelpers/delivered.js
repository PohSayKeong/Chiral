import { uiActions } from "store/ui-slice";

const delivered = async (data, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.requestManagerInstance.methods
            .triggerDelivery(data.index)
            .send({
                from: web3State.accounts[0],
                gas: 80000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
    } catch {
        dispatch(uiActions.showNotification({ status: "failure" }));
    }
};

export default delivered;
