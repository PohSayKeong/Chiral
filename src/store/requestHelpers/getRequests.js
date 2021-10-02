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
                    if (item.returnValues.step === "0") {
                        const temp = {
                            ...item.returnValues,
                            ...item.returnValues.pickup,
                            ...item.returnValues.destination,
                        };
                        temp.pickup_lng /= toCoord;
                        temp.pickup_lat /= toCoord;
                        temp.destination_lng /= toCoord;
                        temp.destination_lat /= toCoord;
                        result.push(temp);
                    } else {
                        result[item.returnValues.index] = {
                            ...result[item.returnValues.index],
                            ...item.returnValues,
                        };
                    }
                    return true;
                })
            );
        const availableRequests = result
            .filter(
                (request) =>
                    request.step === "0" && request.pickupAddress !== account
            )
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
                    (request.pickupAddress === account ||
                        request.courierAddress === account) &&
                    (request.step === "0" ||
                        request.step === "1" ||
                        request.step === "2")
            )
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
                [request.pickup, request.destination, request.requestDistance] =
                    await Promise.all([pickup, destination, requestDistance]);
                return request;
            })
            .reverse();
        const myPastRequests = result
            .filter(
                (request) =>
                    (request.pickupAddress === account ||
                        request.courierAddress === account) &&
                    request.step === "3"
            )
            .reverse();
        dispatch(
            requestActions.setRequests({
                availableRequests: await Promise.all(availableRequests),
                myCurrentRequests: await Promise.all(myCurrentRequests),
                myPastRequests: myPastRequests,
            })
        );
    }
};

export default getRequests;
