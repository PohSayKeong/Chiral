const { fetchRequestDistance } = require("helpers/fetchDistance");

export const distanceToPickup = (data, filterData, setState) => {
    let result = [];
    data.forEach(async (request) => {
        let temp = { ...request };
        temp.distanceToUser = await fetchRequestDistance(
            request.pickup_lng,
            request.pickup_lat,
            filterData.pickupCoord[0],
            filterData.pickupCoord[1]
        );
        result.push(temp);
        if (result.length === data.length) {
            setState(
                result.sort((a, b) => {
                    return a.distanceToUser - b.distanceToUser;
                })
            );
        }
    });
};

export const distanceToDestination = (data, filterData, setState) => {
    let result = [];
    data.forEach(async (request) => {
        let temp = { ...request };
        temp.distanceToUser = await fetchRequestDistance(
            request.destination_lng,
            request.destination_lat,
            filterData.destinationCoord[0],
            filterData.destinationCoord[1]
        );
        result.push(temp);
        if (result.length === data.length) {
            setState(
                result.sort((a, b) => {
                    return a.distanceToUser - b.distanceToUser;
                })
            );
        }
    });
};

export const distanceToRoute = (data, filterData, setState) => {
    let result = [];
    data.forEach(async (request) => {
        let temp = { ...request };
        const distanceToPickup = parseFloat(
            await fetchRequestDistance(
                request.pickup_lng,
                request.pickup_lat,
                filterData.pickupCoord[0],
                filterData.pickupCoord[1]
            )
        );
        const distanceToDestination = parseFloat(
            await fetchRequestDistance(
                request.destination_lng,
                request.destination_lat,
                filterData.destinationCoord[0],
                filterData.destinationCoord[1]
            )
        );
        temp.distanceToUser = (
            distanceToPickup + distanceToDestination
        ).toFixed(2);
        result.push(temp);
        if (result.length === data.length) {
            setState(
                result.sort((a, b) => {
                    return a.distanceToUser - b.distanceToUser;
                })
            );
        }
    });
};
