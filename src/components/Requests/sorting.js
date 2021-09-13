import { fetchDistance } from "helpers/fetchDistance";

export const distanceToUser = (data, targetCoord, setState) => {
    data.forEach(async (request) => {
        let temp = { ...request };
        temp.distanceToUser = await fetchDistance(
            request.pickup_lng,
            request.pickup_lat,
            targetCoord.lng,
            targetCoord.lat
        );
        setState((prevState) => {
            prevState.forEach((request, index) => {
                if (request.index === temp.index) {
                    prevState[index] = temp;
                }
            });
            prevState.sort((a, b) => {
                return a.distanceToUser - b.distanceToUser;
            });
            return [...prevState];
        });
    });
};

export const distanceToPickup = (data, filterData, setState) => {
    data.forEach(async (request) => {
        let temp = { ...request };
        temp.distanceToUser = await fetchDistance(
            request.pickup_lng,
            request.pickup_lat,
            filterData.pickupCoord[0],
            filterData.pickupCoord[1]
        );
        setState((prevState) => {
            prevState.forEach((request, index) => {
                if (request.index === temp.index) {
                    prevState[index] = temp;
                }
            });
            prevState.sort((a, b) => {
                return a.distanceToUser - b.distanceToUser;
            });
            return [...prevState];
        });
    });
};

export const distanceToDestination = (data, filterData, setState) => {
    data.forEach(async (request) => {
        let temp = { ...request };
        temp.distanceToUser = await fetchDistance(
            request.destination_lng,
            request.destination_lat,
            filterData.destinationCoord[0],
            filterData.destinationCoord[1]
        );
        setState((prevState) => {
            prevState.forEach((request, index) => {
                if (request.index === temp.index) {
                    prevState[index] = temp;
                }
            });
            prevState.sort((a, b) => {
                return a.distanceToUser - b.distanceToUser;
            });
            return [...prevState];
        });
    });
};

export const distanceToRoute = (data, filterData, setState) => {
    data.forEach(async (request) => {
        let temp = { ...request };
        const distanceToPickup = parseInt(
            await fetchDistance(
                request.pickup_lng,
                request.pickup_lat,
                filterData.pickupCoord[0],
                filterData.pickupCoord[1]
            )
        );
        const distanceToDestination = parseInt(
            await fetchDistance(
                request.destination_lng,
                request.destination_lat,
                filterData.destinationCoord[0],
                filterData.destinationCoord[1]
            )
        );
        temp.distanceToUser = distanceToPickup + distanceToDestination;
        setState((prevState) => {
            prevState.forEach((request, index) => {
                if (request.index === temp.index) {
                    prevState[index] = temp;
                }
            });
            prevState.sort((a, b) => {
                return a.distanceToUser - b.distanceToUser;
            });
            return [...prevState];
        });
    });
};
