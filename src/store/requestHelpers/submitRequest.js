import { uiActions } from "store/ui-slice";

const handleSubmitRequest = async (data, web3State, dispatch) => {
    dispatch(uiActions.showNotification({ status: "pending" }));
    try {
        await web3State.requestManagerInstance.methods
            .createRequest(
                data.name,
                data.pickup,
                data.destination,
                data.value,
                data.fees,
                data.weight
            )
            .send({
                from: web3State.account,
                gas: 1000000,
            });
        dispatch(uiActions.showNotification({ status: "success" }));
    } catch {
        dispatch(uiActions.showNotification({ status: "failure" }));
    }
};

export default handleSubmitRequest;
