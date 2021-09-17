import fetchAddress from "helpers/fetchAddress";
import { fetchDistance } from "helpers/fetchDistance";
import { requestActions } from "store/request-slice";

const getRequests = async (
    requestManagerInstance,
    account,
    targetCoord,
    dispatch
) => {
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
        const availableRequests = result
            .filter((request) => request._step === "0")
            .map(async (request) => {
                const pickup = fetchAddress(
                    request.pickup_lng,
                    request.pickup_lat
                );
                const destination = fetchAddress(
                    request.destination_lng,
                    request.destination_lat
                );
                const requestDistance = fetchDistance(
                    request.pickup_lng,
                    request.pickup_lat,
                    request.destination_lng,
                    request.destination_lat
                );
                if (targetCoord) {
                    request.distanceToUser = await fetchDistance(
                        request.pickup_lng,
                        request.pickup_lat,
                        targetCoord.lng,
                        targetCoord.lat
                    );
                }
                [request.pickup, request.destination, request.requestDistance] =
                    await Promise.all([pickup, destination, requestDistance]);
                return request;
            });
        const myCurrentRequests = result
            .filter(
                (request) =>
                    request.pickupAddress === account && request._step !== "3"
            )
            .concat(
                result.filter(
                    (request) =>
                        request.deliveryAddress === account &&
                        request._step === "1"
                )
            )
            .map(async (request) => {
                request.pickup = await fetchAddress(
                    request.pickup_lng,
                    request.pickup_lat
                );
                request.destination = await fetchAddress(
                    request.destination_lng,
                    request.destination_lat
                );
                request.requestDistance = await fetchDistance(
                    request.pickup_lng,
                    request.pickup_lat,
                    request.destination_lng,
                    request.destination_lat
                );
                return request;
            });
        dispatch(
            requestActions.setRequests({
                availableRequests: await Promise.all(availableRequests),
                myCurrentRequests: await Promise.all(myCurrentRequests),
            })
        );
    }
};

export default getRequests;
