const axios = require("axios");

const fetchDistance = async (data, key) => {
    const routeResponse = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
            data.pickup_lng
        },${data.pickup_lat};${data.destination_lng},${
            data.destination_lat
        }?geometries=geojson&access_token=${
            key || process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }`
    );
    if (routeResponse.status === 200) {
        return (routeResponse.data.routes[0].distance / 1000).toFixed(2);
    }
};

const fetchRequestDistance = async (lng1, lat1, lng2, lat2) => {
    const routeResponse = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${lng1},${lat1};${lng2},${lat2}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    if (routeResponse.status === 200) {
        return (routeResponse.data.routes[0].distance / 1000).toFixed(2);
    }
};

module.exports = {
    fetchDistance,
    fetchRequestDistance,
};
