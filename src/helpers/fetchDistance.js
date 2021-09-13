export const fetchRequestDistance = async (data) => {
    const routeResponse = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${data.pickup_lng},${data.pickup_lat};${data.destination_lng},${data.destination_lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    ).then((resp) => resp.json());
    return (await routeResponse.routes[0].distance) / 1000;
};

export const fetchDistance = async (lng1, lat1, lng2, lat2) => {
    const routeResponse = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${lng1},${lat1};${lng2},${lat2}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    ).then((resp) => resp.json());
    if (routeResponse.code === "Ok") {
        return ((await routeResponse.routes[0].distance) / 1000).toFixed(2);
    }
};
