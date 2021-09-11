import { uiActions } from "store/ui-slice";
import { requestActions } from "store/request-slice";

const cancelled = async (data, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.requestManagerInstance.methods
            .triggerCancel(data.index)
            .send({
                from: web3State.accounts[0],
                gas: 100000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
        dispatch(requestActions.setViewData(null));
    } catch {
        dispatch(uiActions.showNotification({ status: "failure" }));
    }
};

export default cancelled;
