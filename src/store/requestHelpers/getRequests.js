const getRequests = async (requestManagerInstance) => {
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
        return result;
    }
};

export default getRequests;
