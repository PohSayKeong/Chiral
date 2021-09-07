import { requestActions } from "store/request-slice";

const getRequests = async (requestManagerInstance, account, dispatch) => {
    if (requestManagerInstance.events) {
        const toCoord = Math.pow(10, 15).toFixed(10);
        let result = [];
        await requestManagerInstance
            .getPastEvents("allEvents", {
                fromBlock: 1,
            })
            .then((response) =>
                response.map((item) => {
                    const temp = {
                        ...item.returnValues,
                        ...item.returnValues.pickup,
                        ...item.returnValues.destination,
                    };
                    temp.pickup_lng /= toCoord;
                    temp.pickup_lat /= toCoord;
                    temp.destination_lng /= toCoord;
                    temp.destination_lat /= toCoord;
                    if (!result[item.returnValues.index]) {
                        result.push(temp);
                    } else {
                        result[item.returnValues.index] = temp;
                    }
                    return true;
                })
            );
        dispatch(
            requestActions.setRequests({
                availableRequests: result.filter(
                    (request) => request._step === "0"
                ),
                myCurrentRequests: result
                    .filter(
                        (request) =>
                            request.pickupAddress === account &&
                            request._step !== "3"
                    )
                    .concat(
                        result.filter(
                            (request) =>
                                request.deliveryAddress === account &&
                                request._step === "1"
                        )
                    ),
            })
        );
    }
};

export default getRequests;
