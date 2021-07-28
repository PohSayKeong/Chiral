const fetchDistance = async (data) => {
    const routeResponse = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${data.pickup_lng},${data.pickup_lat};${data.destination_lng},${data.destination_lat}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
    ).then((resp) => resp.json());
    return (await routeResponse.routes[0].distance) / 1000;
};

export default fetchDistance;
