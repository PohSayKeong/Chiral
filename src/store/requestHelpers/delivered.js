import { uiActions } from "store/ui-slice";
import { requestActions } from "store/request-slice";

const delivered = async (data, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.requestManagerInstance.methods
            .triggerDelivery(data.index)
            .send({
                from: web3State.account,
                gas: 80000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
        dispatch(requestActions.setViewData(null));
    } catch {
        dispatch(uiActions.showNotification({ status: "failure" }));
    }
};

export default delivered;
